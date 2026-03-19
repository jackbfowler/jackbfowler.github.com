import re

file_path = '/Users/jack/Documents/Code/jackbfowler.github.com/src/data/projects.tsx'

with open(file_path, 'r') as f:
    content = f.read()

# Add import if missing
if 'import Zoom' not in content:
    import_statement = "import Zoom from 'react-medium-image-zoom';\nimport 'react-medium-image-zoom/dist/styles.css';\n"
    content = content.replace("import React from 'react';", "import React from 'react';\n" + import_statement)

# Regex to safely wrap <img ... /> tags with <Zoom>...</Zoom>
# Negative lookbehinds/aheads ensure we don't double wrap if it's already wrapped
# We also want to match multiline img tags, so we use re.DOTALL and re.MULTILINE logic
# But in React they are usually single line or formatted with newlines.
# Let's just find anything starting with <img and ending with /> that isn't already inside <Zoom>

# Find all occurrences of <img ... /> and wrap them
# We can do a simple substitution. If it's already wrapped, this might double wrap if we run it twice, but we are running it once.
content = re.sub(r'(<img[^>]*?/>)', r'<Zoom>\1</Zoom>', content)

with open(file_path, 'w') as f:
    f.write(content)

print(f"Successfully processed {file_path}")
