#!/usr/bin/env bash
set -euo pipefail

##############################################################################
# Configuration
##############################################################################
SDKS_REPO_URL="https://github.com/Uniswap/sdks.git"
SDKS_SUBMODULE_DIR="sdks"
V4_SDK_DIR="${SDKS_SUBMODULE_DIR}/sdks/v4-sdk"

# TypeDoc will output to this folder inside v4-sdk
TYPEDOC_OUTPUT_DIR="${V4_SDK_DIR}/tmp/docs"

# Where we want the final docs in our Docusaurus site
DOCS_V4_ROOT="docs/sdk/v4"
DOCS_REFERENCE_DIR="${DOCS_V4_ROOT}/reference"

# Config added to the beginning of overview.md after generation
OVERVIEW_DOC_CONFIG_STR="---\nid: overview\nsidebar_position: 1\ntitle: Overview\n---\n"

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
    --out tmp/docs \
    --plugin typedoc-plugin-markdown \
    --hidePageHeader true \
    --hidePageTitle true \
    --modulesFileName overview \
    --membersWithOwnFile Class \
    --membersWithOwnFile Enum \
    --membersWithOwnFile Interface \
    --parametersFormat table \
    --skipErrorChecking \
    --entryPoints src/index.ts \
    --tsconfig tsconfig.json
)

##############################################################################
# 4. Post-processing: Remove all backslashes from *.md
##############################################################################
echo "==> Removing all backslashes in Markdown files..."
# The regex removes one or more backslashes (\\+) from the file.
# If you only have single backslashes, 's/\\//g' is enough.
# But typedoc can sometimes escape characters with multiple \\
find "$TYPEDOC_OUTPUT_DIR" -type f -name "*.md" -exec \
  sed -i.bak -E 's/\\+//g' {} \; -exec rm {}.bak \;

##############################################################################
# 5. Remove old v4 folder & copy new docs into docs/sdk/v4/reference
##############################################################################
echo "==> Removing old v4 folder at $DOCS_REFERENCE_DIR..."
rm -rf "$DOCS_REFERENCE_DIR"
mkdir -p "$DOCS_REFERENCE_DIR"

echo "==> Copying newly generated docs to $DOCS_REFERENCE_DIR..."
cp -R "$TYPEDOC_OUTPUT_DIR/"* "$DOCS_REFERENCE_DIR/"

##############################################################################
# 6. Append doc config to $DOCS_REFERENCE_DIR/overview.md, remove README.md & guides folder
##############################################################################
if [ -f "$DOCS_REFERENCE_DIR/overview.md" ]; then
  echo "==> Append doc config to $DOCS_REFERENCE_DIR/overview.md..."
  sed -i.bak "1s/^/$OVERVIEW_DOC_CONFIG_STR\n/" "$DOCS_REFERENCE_DIR/overview.md"
  rm -f "$DOCS_REFERENCE_DIR/overview.md.bak"
fi

if [ -f "$DOCS_REFERENCE_DIR/README.md" ]; then
  rm -f "$DOCS_REFERENCE_DIR/README.md"
fi

if [ -d "$DOCS_REFERENCE_DIR/guides" ]; then
  rm -rf "$DOCS_REFERENCE_DIR/guides"
fi

##############################################################################
# 7. Clean up the sdks submodule after generation
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
