#!/usr/bin/env bash

sudo systemctl stop aviv

stack build

cd webapp

npm install

./node_modules/webpack/bin/webpack.js -p

sudo systemctl start aviv
