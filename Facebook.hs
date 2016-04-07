{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes       #-}

module Facebook where

import Foundation
import Yesod.Core
import Config
import Data.Aeson
import Data.Text

getFbAccessTokenR :: Handler Value
getFbAccessTokenR = do
  appSecret <- liftIO fbAppSecret
  return $ appSecretToJson appSecret

appSecretToJson :: Maybe String ->  Value
appSecretToJson ( Just secret ) = object ["data" .= secret]
appSecretToJson _ = object ["data" .= ("wump wump" :: Text)]

