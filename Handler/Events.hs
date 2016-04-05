module Handler.Events where

import Import
import Data.Aeson (decode, (.=))
import Data.Aeson.Types (emptyArray)
import Data.Maybe (fromMaybe)

-- This is a handler function for the GET request method on the HomeR
-- resource pattern. All of your resource patterns are defined in
-- config/routes
--
-- The majority of the code you will write in Yesod lives in these handler
-- functions. You can spread them across multiple files if you are so
-- inclined, or create a single monolithic file.
getEventsR :: Handler Value
getEventsR = do
  let json = decode "{\"data\": \"[]\"}"
  return $ fromMaybe emptyArray json
