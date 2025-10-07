# Usage: ./scripts/v4-forge-doc.sh, called from the root directory
# NOTE: This script appears to not work with WSL, and is intended to run on MacOS
# NOTE: submodules should be updated outside of the script

# regenerate docs
forge doc --root submodules/v4-core --out forge-docs/v4-core
rm -rf submodules/v4-core/forge-docs
forge doc --root submodules/v4-periphery --out forge-docs/v4-periphery
rm -rf submodules/v4-periphery/forge-docs

# recursively remove .md files from /docs/contracts/v4/reference/core and /docs/contracts/v4/reference/periphery
find docs/contracts/v4/reference/core -type f -name "*.md" -delete
find docs/contracts/v4/reference/periphery -type f -name "*.md" -delete

process_doc() {
    local file=$1

    # Extract the directory part (e.g., base, base/hooks, libraries)
    dir_structure=$(echo "$file" | sed -r 's|.*/src/([^/]+)/.*\.sol/.*|\1|')

    # if dir_structure is src, remove it so it appears at the root level
    if [ "$dir_structure" == "src" ]; then
        dir_structure=""
    fi

    # Extract the base filename without the path and extension (e.g., Multicall_v4, BaseHook, Locker)
    base_filename=$(echo "$file" | sed -r 's|.*/([^/]+)\.sol/[^/]*\.(.*)\.md|\1|')

    # Construct the new file path
    new_file="docs/contracts/v4/reference/${component}/${dir_structure}/${base_filename}.md"

    # Create the new directory structure if it doesn't exist
    mkdir -p "docs/contracts/v4/reference/${component}/${dir_structure}"

    first_file=false
    # if the file already exists, concatenate the new file to the end of the existing file
    if [ -f "$new_file" ]; then
        cat "$file" >> "$new_file"
    else
        first_file=true
        cp "$file" "$new_file"
    fi

    # Fix the Git source link
    # replace `https://github.com/Uniswap/docs/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/interfaces/IPositionManager.sol`
    # with `https://github.com/Uniswap/v4-{component}/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/interfaces/IPositionManager.sol`
    sed -i '' -e "s|uniswap/docs/|uniswap/v4-${component}/|g" "$new_file"

    # Add note about forge doc, if its not already added
    if $first_file; then
        sed -i '' '2s|$| - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)|' "$new_file"
    fi


    # Replace relative path links within the file with full paths
    # sed -i '' -e "s|/src/\([^/]\+\)/\([^/]\+\)\.sol/\([^/]\+\)\.\([^/]\+\)\.md|contracts/v4/reference/${component}/\1/\2.md|g" "$new_file"
    sed -i '' -e "s|/src/\([^/]\{1,\}\)/\([^/]\{1,\}\)\.sol/\([^/]\{1,\}\)\.\([^/]\{1,\}\)\.md|contracts/v4/reference/${component}/\1/\2.md|g" "$new_file"

    # specially handle core paths
    if [ "$component" == "core" ]; then
        # replaces: /src/ProtocolFees.sol/abstract.ProtocolFees.md to contracts/v4/reference/core/ProtocolFees.md
        sed -i '' -E 's|/src/([^/]+)\.sol/abstract\.[^/]+\.md|contracts/v4/reference/core/\1.md|g' "$new_file"

        # replaces: /src/interfaces/external/IERC6909Claims.sol/interface.IERC6909Claims.md to contracts/v4/reference/core/interfaces/IERC6909Claims.md
        sed -i '' -E 's|/src/interfaces/external/([^/]+)\.sol/interface\.[^/]+\.md|contracts/v4/reference/core/interfaces/\1.md|g' "$new_file"
    fi

    echo "Copied: $file -> $new_file"
}

copy_docs() {
    local component=$1

    # process type.NAME.md files
    find "forge-docs/v4-$component/src" -type f -regex '.*\.sol/type*\.[^.]*\.md' | while read file; do
        process_doc "$file"
    done

    # process struct.NAME.md files
    find "forge-docs/v4-$component/src" -type f -regex '.*\.sol/struct*\.[^.]*\.md' | while read file; do
        process_doc "$file"
    done

    # process enum.NAME.md files
    find "forge-docs/v4-$component/src" -type f -regex '.*\.sol/enum*\.[^.]*\.md' | while read file; do
        process_doc "$file"
    done

    # process library.NAME.md files
    find "forge-docs/v4-$component/src" -type f -regex '.*\.sol/library*\.[^.]*\.md' | while read file; do
        process_doc "$file"
    done

    # process function.NAME.md files
    find "forge-docs/v4-$component/src" -type f -regex '.*\.sol/function*\.[^.]*\.md' | while read file; do
        process_doc "$file"
    done

    # process the rest, excluding files that are already processed

    find "forge-docs/v4-$component/src" -type f -regex '.*\.sol/[^.]*\.[^.]*\.md' ! -name 'type.*.md' ! -name 'struct.*.md' ! -name 'enum.*.md' ! -name 'library.*.md' ! -name 'function.*.md' | while read file; do
        process_doc "$file"
    done

}

copy_docs "periphery"
copy_docs "core"