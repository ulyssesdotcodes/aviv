{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}

module Config where

import Data.Yaml (FromJSON(..), (.:))
import GHC.Generics

import qualified Data.ByteString.Char8 as BS
import qualified Data.Yaml as Y

data Config =
  Config {
    fb :: String
  } deriving (Show, Generic)

instance FromJSON Config

fbAppSecret :: IO (Maybe String)
fbAppSecret = do
  ymlData <- BS.readFile "config/keys.yml"
  return $ fmap fb $ Y.decode ymlData

