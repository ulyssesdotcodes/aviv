{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes       #-}
{-# LANGUAGE DeriveGeneric #-}

module Facebook where

import Foundation
import Yesod.Core
import Config

import Control.Lens
import Data.Aeson
import Data.Aeson.Lens
import Data.Aeson.Types (typeMismatch)
import Data.List (intercalate, sortBy, reverse)
import Data.Ord (comparing)
import Data.Time.Clock
import Data.Time.Format
import GHC.Generics
import Network.HTTP.Conduit
import System.IO

import qualified Data.ByteString as BS
import qualified Data.ByteString.Char8 as BC
import qualified Data.ByteString.Lazy.Search as BSS
import qualified Data.Text as T
import qualified Data.Vector as V

data Cover =
  Cover { source :: T.Text } deriving (Show, Generic)

instance FromJSON Cover
instance ToJSON Cover

data Event =
  Event { attending_count :: Int
        , description :: T.Text
        , cover :: Cover
        , id :: T.Text
        , name :: T.Text
        , ticket_uri :: Maybe T.Text
        , start_time :: UTCTime
        } deriving (Show, Generic)

instance FromJSON Event
instance ToJSON Event

data EventsRequest =
  EventsRequest { past :: Bool
                , cursor :: Maybe String
                } deriving Show

data EventsResponse =
  EventsResponse { events :: [Event]
                 , next :: Maybe String
                 } deriving (Show, Generic)
instance FromJSON EventsResponse
instance ToJSON EventsResponse

appId = "212022015831331"
facebookUrl = "https://graph.facebook.com/v2.6/"

eventFieldsQuery = ("fields", "attending_count,description,cover,name,ticket_uri,start_time")
limitQuery = ("limit", "25")

accessTokenParam = "access_token"

getFbEventsR :: Handler Value
getFbEventsR = do
  params <- reqGetParams <$> getRequest
  liftIO $ accessToken >>= (\a -> toJSON <$> venueEvents "278407115702132" (parseRequest params) a)

accessToken :: IO (Maybe String)
accessToken = do
  appSecret <- liftIO fbAppSecret
  return $ fmap (\as -> appId ++ "|" ++ as) appSecret

-- Network

parseRequest :: [(T.Text, T.Text)] -> Maybe EventsRequest
parseRequest params =
  fmap (\p -> EventsRequest p cursor) past
  where
    past =
      case filter ((=="past") . T.unpack . fst) params of
        (x:_) -> Just $ (\b -> b == "true") $ (T.unpack . snd) x
        []    -> Nothing
    cursor =
      case filter ((=="cursor") . T.unpack . fst) params of
        (x:_) -> Just $ (T.unpack . snd) x
        []    -> Nothing

generateFbRequest :: String -> String -> UTCTime -> EventsRequest -> String
generateFbRequest venue atStr now (EventsRequest past cursor) =
  fbRequestUrl venue atStr
    ([(timeframe past, formatTime defaultTimeLocale "%FT%T%Q" $ relativeNow past), ("limit", limit past)] ++ (page cursor))
  where
    timeframe True = "until"
    timeframe False = "since"
    limit True = "25"
    limit False = "100"
    relativeNow True = UTCTime (utctDay now) (utctDayTime now - secondsToDiffTime (8 * 60 * 60))
    relativeNow False = UTCTime (utctDay now) (utctDayTime now - secondsToDiffTime (8 * 60 * 60))
    page Nothing = []
    page (Just cursor) = [("after", cursor)]

eventsRequestQueryParams :: EventsRequest -> String
eventsRequestQueryParams (EventsRequest past Nothing) =
  queryParams [("past", boolToString past)]
eventsRequestQueryParams (EventsRequest past (Just cursor)) =
  queryParams [("past", boolToString past), ("cursor", cursor)]

boolToString :: Bool -> String
boolToString True = "true"
boolToString False = "false"

fbRequestUrl :: String -> String -> [(String, String)] -> String
fbRequestUrl venue atValue extra = facebookUrl ++ venue ++ "/events?" ++
  queryParams ([eventFieldsQuery, (accessTokenParam, atValue)] ++ extra)

queryParams :: [(String, String)] -> String
queryParams = intercalate "&" . map (\(k, v) -> k ++ "=" ++ v)


-- Events

venueEvents :: String -> Maybe EventsRequest -> Maybe String -> IO EventsResponse
venueEvents venue (Just eventReq) (Just atStr) = do
  now <- getCurrentTime
  json <- simpleHttp (url now)
  return $ req json
  where
    req json = EventsResponse (sortEvents (past eventReq) $ eventsVec json) (nextURL json)
    url now = generateFbRequest venue atStr now eventReq
    eventsVec eventsJson = resultsFromVector (eventsJson ^? key "data" . _Array)
    nextURL json = urlParams (boolToString $ past eventReq) (json ^? key "paging" . key "cursors" . key "after" . _String) (json ^? key "paging" . key "next")
    sortEvents False = sortBy $ comparing start_time
    sortEvents True = reverse . sortEvents False
    urlParams past (Just a) (Just _) = Just $ queryParams [("past", past), ("cursor", T.unpack a)]
    urlParams _ Nothing _ = Nothing
    urlParams _ _ Nothing = Nothing
venueEvents _ Nothing _ = return $ EventsResponse [] Nothing
venueEvents _ _ Nothing = return $ EventsResponse [] Nothing

resultsFromVector :: Maybe (V.Vector Value) -> [Event]
resultsFromVector (Just vec) = (concat . V.toList) $ V.map (eventFromResult . fromJSON) vec
resultsFromVector Nothing = []

eventFromResult :: Result Event -> [ Event ]
eventFromResult (Success a) = [a]
eventFromResult _ = []
