import json
import re

with open('src/data/blogs.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)

for blog in blogs:
    content = blog['content']
    
    # Remove #, *, -
    content = re.sub(r'[#*\-]', '', content)
    
    # Fix double spaces caused by removing markers
    content = re.sub(r' +', ' ', content)
    
    # Remove excessive newlines
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    blog['content'] = content
    
    # Update excerpt
    excerpt = content[:150].strip() + "..."
    # Ensure excerpt doesn't have broken words or weird spacing
    excerpt = re.sub(r'\s+', ' ', excerpt)
    blog['excerpt'] = excerpt

with open('src/data/blogs.json', 'w', encoding='utf-8') as f:
    json.dump(blogs, f, indent=2)
print("Scrubbed markdown")
