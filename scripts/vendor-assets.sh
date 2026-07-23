#!/usr/bin/env bash
set -euo pipefail

# Vendor remote assets into public/assets for offline local builds.
# Run this from the repo root on branch fix/mainjs.

BRANCH="fix/mainjs"

echo "Checking out branch $BRANCH"
git fetch origin
git checkout $BRANCH

mkdir -p public/assets/images public/assets/sfx public/assets/bgm

echo "Downloading image assets..."
curl -L -o public/assets/images/background-3.png "https://cdn.jsdelivr.net/gh/kenneyNL/space-shooter-redux@master/PNG/background-3.png"
curl -L -o public/assets/images/playerShip1_blue.png "https://cdn.jsdelivr.net/gh/kenneyNL/space-shooter-redux@master/PNG/playerShip1_blue.png"
curl -L -o public/assets/images/enemyBlue1.png "https://cdn.jsdelivr.net/gh/kenneyNL/space-shooter-redux@master/PNG/Enemies/enemyBlue1.png"
curl -L -o public/assets/images/enemyRed1.png "https://cdn.jsdelivr.net/gh/kenneyNL/space-shooter-redux@master/PNG/Enemies/enemyRed1.png"
curl -L -o public/assets/images/explosion.png "https://cdn.jsdelivr.net/gh/mvasilkov/space-shooter-redux@master/src/assets/effects/explosion.png"

echo "Downloading SFX..."
curl -L -o public/assets/sfx/laserSmall.ogg "https://cdn.jsdelivr.net/gh/kenneyNL/space-shooter-redux@master/PNG/Sound/laserSmall.ogg"
curl -L -o public/assets/sfx/laserSmall.mp3 "https://cdn.jsdelivr.net/gh/kenneyNL/space-shooter-redux@master/PNG/Sound/laserSmall.mp3" || true
curl -L -o public/assets/sfx/explosion.ogg "https://cdn.jsdelivr.net/gh/kenneyNL/space-shooter-redux@master/PNG/Sound/explosion.ogg"
curl -L -o public/assets/sfx/explosion.mp3 "https://cdn.jsdelivr.net/gh/kenneyNL/space-shooter-redux@master/PNG/Sound/explosion.mp3" || true
curl -L -o public/assets/sfx/hit.ogg "https://cdn.jsdelivr.net/gh/kenneyNL/space-shooter-redux@master/PNG/Sound/hit.ogg"
curl -L -o public/assets/sfx/hit.mp3 "https://cdn.jsdelivr.net/gh/kenneyNL/space-shooter-redux@master/PNG/Sound/hit.mp3" || true
curl -L -o public/assets/sfx/powerup.ogg "https://opengameart.org/sites/default/files/powerup.ogg"
curl -L -o public/assets/sfx/powerup.mp3 "https://opengameart.org/sites/default/files/powerup.mp3" || true

echo "Downloading BGM..."
curl -L -o public/assets/bgm/short-synth-loop.ogg "https://opengameart.org/sites/default/files/short-synth-loop.ogg"
curl -L -o public/assets/bgm/short-synth-loop.mp3 "https://opengameart.org/sites/default/files/short-synth-loop.mp3" || true

# Ensure manifest points to local assets (we already updated manifest to local paths in the branch)
if git status --porcelain | grep -q "^"; then
  echo "Staging vendorized assets..."
  git add public/assets
  git commit -m "chore(assets): vendor remote assets for offline usage"
  echo "Committed vendorized assets. Run: git push origin $BRANCH"
else
  echo "No changes to commit. If assets were just downloaded, they should be present in public/assets." 
fi

echo "Done. To build and serve locally now run:\n  npm ci\n  npm run build\n  npx serve dist\n"
