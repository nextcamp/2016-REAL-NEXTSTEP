#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

npm run build
mv build/* out/