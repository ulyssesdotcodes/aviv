 {-# LANGUAGE OverloadedStrings #-}
 {-# LANGUAGE QuasiQuotes       #-}
 module Facebook where

 import Foundation
 import Yesod.Core

 getAppTokenR :: 

 getHomeR :: Handler Html
 getHomeR = defaultLayout $ do
     setTitle "Minimal Multifile"
     [whamlet|
         <p>
             <a href=@{AddR 5 7}>HTML addition
         <p>
             <a href=@{AddR 5 7}?_accept=application/json>JSON addition
     |]
