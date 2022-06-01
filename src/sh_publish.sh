#!/bin/bash
# get first argument as canister
CANISTER=$1
# error if no canister
if [ -z "$CANISTER" ]; then
  echo "Error: No canister specified"
  exit 1
fi

# get second argument as version
VERSION=$2
# error if no version
if [ -z "$VERSION" ]; then
  echo "Error: No version specified"
  exit 1
fi

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

cd "$dir/$CANISTER/client"
yarn publish --frozen-lockfile --non-interactive --no-git-tag-version --no-commit-hooks --new-version $VERSION

cd "$dir/$CANISTER/server"
yarn publish --frozen-lockfile --non-interactive --no-git-tag-version --no-commit-hooks --new-version $VERSION

echo "publish done"

cd $dir