{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TemplateHaskell   #-}
{-# LANGUAGE ViewPatterns      #-}
module Application where

import Foundation
import Yesod.Core

-- import Add
-- import Home
import Facebook

mkYesodDispatch "App" resourcesApp
