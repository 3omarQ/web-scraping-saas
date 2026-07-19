#!/usr/bin/env bash
set -o errexit

npm install
npm run build

export PUPPETEER_CACHE_DIR=/opt/render/.cache/puppeteer
mkdir -p $PUPPETEER_CACHE_DIR

npx puppeteer browsers install chrome

# Persist the Chrome install into the build output directory,
# since /opt/render/.cache is NOT carried over to the runtime container.
if [[ ! -d /opt/render/project/src/.cache/puppeteer ]]; then
  echo "...Copying Puppeteer Cache to persisted project directory"
  mkdir -p /opt/render/project/src/.cache/puppeteer
  cp -R $PUPPETEER_CACHE_DIR/chrome /opt/render/project/src/.cache/puppeteer/
else
  echo "...Puppeteer Cache already present in persisted project directory"
fi