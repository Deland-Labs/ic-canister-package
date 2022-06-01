#!/bin/bash
# get first argument as canister
CANISTER=$1
# error if no canister
if [ -z "$CANISTER" ]; then
  echo "Error: No canister specified"
  exit 1
fi

cd $CANISTER/client

npx ic-didc bind index.did --target ts > index.d.ts
npx ic-didc bind index.did --target js > index.ts
npx tsc index.ts
echo "update $CANISTER done"

cd "$(dirname "$0")"