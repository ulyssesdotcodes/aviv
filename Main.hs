 {-# LANGUAGE QuasiQuotes, TemplateHaskell, OverloadedStrings, TypeFamilies, MultiParamTypeClasses #-}
import Application () -- for YesodDispatch instance
import Foundation
import Yesod.Core
import Yesod.Static
import Network.Wai
import Network.Wai.Handler.Warp
import Network.Wai.Middleware.Cors

main :: IO ()
main = do
  app <- toWaiApp App
  run 3010 $ simpleCors app
