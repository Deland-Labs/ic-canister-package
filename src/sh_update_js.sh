#!/bin/bash
# get first argument as canister
CANISTER=$1
# error if no canister
if [ -z "$CANISTER" ]; then
  echo "Error: No canister specified"
  exit 1
fi

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

cd "$dir/$CANISTER/client"
npx ic-didc bind index.did --target ts > did.ts
npx ic-didc bind index.did --target js > idl.ts
npx tsc

cd "$dir/$CANISTER/server"
npx ic-didc bind index.did --target ts > did.ts
npx ic-didc bind index.did --target js > idl.ts
npx tsc

echo "update $CANISTER done"

cd $dir