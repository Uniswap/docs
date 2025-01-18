#!/usr/bin/env bash
set -euo pipefail

##############################################################################
# Configuration
##############################################################################
SDKS_REPO_URL="https://github.com/Uniswap/sdks.git"
SDKS_SUBMODULE_DIR="sdks"
V4_SDK_DIR="${SDKS_SUBMODULE_DIR}/sdks/v4-sdk"

# TypeDoc will output to this folder inside v4-sdk
TYPEDOC_OUTPUT_DIR="${V4_SDK_DIR}/docs"

# Where we want the final docs in our Docusaurus site
DOCS_V4_ROOT="docs/sdk/v4"
DOCS_REFERENCE_DIR="${DOCS_V4_ROOT}/reference"

##############################################################################
# 1. Add (if missing) or update the sdks submodule
##############################################################################
if [ ! -d "$SDKS_SUBMODULE_DIR" ]; then
  echo "==> Adding submodule for sdks..."
  git submodule add --force "$SDKS_REPO_URL" "$SDKS_SUBMODULE_DIR"
fi

echo "==> Updating sdks submodule..."
git submodule update --init --recursive
(
  cd "$SDKS_SUBMODULE_DIR"
  # Adjust branch/commit if you need a specific version
  git checkout main
  git pull origin main
)

##############################################################################
# 2. Install docgen dependencies (typedoc, typedoc-plugin-markdown, TS) via Yarn
##############################################################################
echo "==> Installing typedoc, plugin & TS in v4-sdk..."
(
  cd "$V4_SDK_DIR"
  yarn add -D typedoc typedoc-plugin-markdown typescript
  yarn install --frozen-lockfile
)

##############################################################################
# 3. Generate Markdown docs with TypeDoc (using --skipErrorChecking)
##############################################################################
echo "==> Generating Markdown docs for v4-sdk..."
(
  cd "$V4_SDK_DIR"
  yarn typedoc \
    --out docs \
    --plugin typedoc-plugin-markdown \
    --skipErrorChecking \
    --entryPoints src/index.ts \
    --tsconfig tsconfig.json
)

##############################################################################
# 4. Remove old v4 folder & copy new docs into docs/sdk/v4/reference
##############################################################################
echo "==> Removing old v4 folder at $DOCS_V4_ROOT..."
rm -rf "$DOCS_V4_ROOT"
mkdir -p "$DOCS_REFERENCE_DIR"

echo "==> Copying newly generated docs to $DOCS_REFERENCE_DIR..."
cp -R "$TYPEDOC_OUTPUT_DIR/"* "$DOCS_REFERENCE_DIR/"

##############################################################################
# 5. Rename index.md -> overview.md & remove any guides folder
##############################################################################
if [ -f "$DOCS_REFERENCE_DIR/index.md" ]; then
  mv "$DOCS_REFERENCE_DIR/index.md" "$DOCS_REFERENCE_DIR/overview.md"
fi
if [ -f "$DOCS_REFERENCE_DIR/README.md" ]; then
  mv "$DOCS_REFERENCE_DIR/README.md" "$DOCS_REFERENCE_DIR/overview.md"
fi

if [ -d "$DOCS_REFERENCE_DIR/guides" ]; then
  rm -rf "$DOCS_REFERENCE_DIR/guides"
fi

##############################################################################
# 6. Create _category_.json files (overwriting) as requested
##############################################################################
echo "==> Creating _category_.json in sdk/v4/ and sdk/v4/reference..."

# 6a. sdk/v4/_category_.json
mkdir -p "$DOCS_V4_ROOT"
cat <<EOF > "$DOCS_V4_ROOT/_category_.json"
{
  "label": "V4 SDK",
  "position": 1,
  "collapsed": false
}
EOF

# 6b. sdk/v4/reference/_category_.json
cat <<EOF > "$DOCS_REFERENCE_DIR/_category_.json"
{
  "label": "Technical Reference",
  "position": 3,
  "collapsed": true
}
EOF

##############################################################################
# 7. Remove the sdks submodule (cleanup)
##############################################################################
echo "==> Removing sdks submodule..."
rm -rf "$SDKS_SUBMODULE_DIR"

if [ -f .gitmodules ]; then
  # Remove submodule config in .gitmodules
  sed -i.bak '/\[submodule "sdks"\]/,/^$/d' .gitmodules
  rm -f .gitmodules.bak
fi

# Remove any leftover submodule references in .git/config
git config --remove-section submodule.sdks || true

##############################################################################
# Done!
##############################################################################
echo "==> Done! v4-sdk docs in $DOCS_REFERENCE_DIR."
