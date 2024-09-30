# Usage: ./scripts/v4-forge-doc.sh, called from the root directory

# regenerate docs
forge doc --root submodules/v4-core --out forge-docs/v4-core
rm -rf submodules/v4-core/forge-docs
forge doc --root submodules/v4-periphery --out forge-docs/v4-periphery
rm -rf submodules/v4-periphery/forge-docs

# Copy v4-core
find forge-docs/v4-core/src -type f -regex '.*\.sol/[^.]*\.[^.]*\.md' | while read file; do
    # Extract the directory part (e.g., base, base/hooks, libraries)
    dir_structure=$(echo "$file" | sed -r 's|.*/src/([^/]+)/.*\.sol/.*|\1|')

    # if dir_structure is src, remove it so it appears at the root level
    if [ "$dir_structure" == "src" ]; then
        dir_structure=""
    fi

    # Extract the base filename without the path and extension (e.g., Multicall_v4, BaseHook, Locker)
    base_filename=$(echo "$file" | sed -r 's|.*/([^/]+)\.sol/[^/]*\.(.*)\.md|\1|')

    # Construct the new file path
    new_file="docs/contracts/v4/reference/core/${dir_structure}/${base_filename}.md"

    # Create the new directory structure if it doesn't exist
    mkdir -p "docs/contracts/v4/reference/core/${dir_structure}"

    # Copy the file to the new location
    cp "$file" "$new_file"

    # Add note: 
    sed -i '3i | Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)' "$new_file"

    # Replace relative path links within the file with full paths
    # replaces: /src/interfaces/IPoolManager.sol/interface.IPoolManager.md to contracts/v4/reference/core/interfaces/IPoolManager.md
    sed -i 's|/src/\([^/]\+\)/\([^/]\+\)\.sol/\([^/]\+\)\.\([^/]\+\)\.md|contracts/v4/reference/core/\1/\2.md|g' "$new_file"

    # replaces: /src/ProtocolFees.sol/abstract.ProtocolFees.md to contracts/v4/reference/core/ProtocolFees.md
    sed -i -E 's|/src/([^/]+)\.sol/abstract\.[^/]+\.md|contracts/v4/reference/core/\1.md|g' "$new_file"

    # replaces: /src/interfaces/external/IERC6909Claims.sol/interface.IERC6909Claims.md to contracts/v4/reference/core/interfaces/IERC6909Claims.md
    sed -i -E 's|/src/interfaces/external/([^/]+)\.sol/interface\.[^/]+\.md|contracts/v4/reference/core/interfaces/\1.md|g' "$new_file"

    echo "Copied: $file -> $new_file"
done

# Copy v4-periphery
find forge-docs/v4-periphery/src -type f -regex '.*\.sol/[^.]*\.[^.]*\.md' | while read file; do
    # Extract the directory part (e.g., base, base/hooks, libraries)
    dir_structure=$(echo "$file" | sed -r 's|.*/src/([^/]+)/.*\.sol/.*|\1|')

    # if dir_structure is src, remove it so it appears at the root level
    if [ "$dir_structure" == "src" ]; then
        dir_structure=""
    fi

    # Extract the base filename without the path and extension (e.g., Multicall_v4, BaseHook, Locker)
    base_filename=$(echo "$file" | sed -r 's|.*/([^/]+)\.sol/[^/]*\.(.*)\.md|\1|')

    # Construct the new file path
    new_file="docs/contracts/v4/reference/periphery/${dir_structure}/${base_filename}.md"

    # Create the new directory structure if it doesn't exist
    mkdir -p "docs/contracts/v4/reference/periphery/${dir_structure}"

    # Copy the file to the new location
    cp "$file" "$new_file"

    # Add note: 
    sed -i '3i | Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)' "$new_file"

    # Replace relative path links within the file with full paths
    sed -i 's|/src/\([^/]\+\)/\([^/]\+\)\.sol/\([^/]\+\)\.\([^/]\+\)\.md|contracts/v4/reference/periphery/\1/\2.md|g' "$new_file"

    echo "Copied: $file -> $new_file"
done