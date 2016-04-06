 {-# LANGUAGE QuasiQuotes, TemplateHaskell, OverloadedStrings, TypeFamilies, MultiParamTypeClasses #-}
-- import Application () -- for YesodDispatch instance
import Foundation
import Yesod.Core
import Yesod.Static

staticFiles "static"

main :: IO ()
main = do
  static@(Static settings) <- static "static"
  warp 3000 $ App static
