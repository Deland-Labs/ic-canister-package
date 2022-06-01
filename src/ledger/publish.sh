# get first argument as version
VERSION=$1
# error if no version
if [ -z "$VERSION" ]; then
  echo "Error: No version specified"
  exit 1
fi

cd client
yarn publish --frozen-lockfile --non-interactive --no-git-tag-version --no-commit-hooks --new-version $VERSION
cd ../

cd server
yarn publish --frozen-lockfile --non-interactive --no-git-tag-version --no-commit-hooks --new-version $VERSION
cd ../