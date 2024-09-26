# Usage: ./scripts/v4-forge-doc.sh, called from the root directory

# Find all the .md files in the source directory
# @dev assumes that v4-periphery and v4-core are in the parent directory
# i.e. /home/user/docs, /home/user/v4-periphery, /home/user/v4-core

# Copy v4-periphery
find ../v4-periphery/docs/src -type f -regex '.*\.sol/[^.]*\.[^.]*\.md' | while read file; do
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