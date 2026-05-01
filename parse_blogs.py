import json
import re

with open('blogs_content.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Define the exact titles to split by
titles = [
    "1. Why Your Website Isn’t Getting Leads (And How to \nFix It Fast in 2026)",
    "2. Struggling to Rank on Google? 7 Proven SEO Fixes \nThat Actually Work",
    "3. Google Business Profile Suspended? Here's Exactly How to Recover It \nQuickly",
    "4. No Time for Customer Support? How AI Agents Can \nHandle 80% of Your Queries",
    "5. WordPress vs Custom Web Design: Which One Will \nGrow Your Business Faster?",
    "6. Local SEO in 2026: How to Dominate Your Area and \nGet More Calls"
]

# We need to clean up the text first to make it easier to split or just regex search
# Let's use regex with the known prefixes
pattern = r'(?m)^(1|2|3|4|5|6)\.\s+([A-Z].*?(?:\n.*?)*?(?=\n\n|\n[A-Z][a-z]+))'
# This is getting complicated. Let's just split using the known exact strings or their first few words.

import os

blogs = []
# Since the PDF text might have newlines in the titles, let's match the number and a few words.
split_patterns = [
    r"1\. Why Your Website Isn",
    r"2\. Struggling to Rank on Google\?",
    r"3\. Google Business Profile Suspended\?",
    r"4\. No Time for Customer Support\?",
    r"5\. WordPress vs Custom Web Design:",
    r"6\. Local SEO in 2026:"
]

# Find the indices of each pattern
indices = []
for p in split_patterns:
    match = re.search(p, text)
    if match:
        indices.append(match.start())

indices.append(len(text))

for i in range(len(indices)-1):
    start = indices[i]
    end = indices[i+1]
    chunk = text[start:end].strip()
    
    # extract title (first 1 or 2 lines)
    lines = chunk.split('\n')
    title_lines = []
    for line in lines:
        if line.strip() == "":
            break
        title_lines.append(line.strip())
    
    raw_title = " ".join(title_lines)
    # clean up the leading number
    title = re.sub(r'^\d+\.\s*', '', raw_title)
    
    content = "\n".join(lines[len(title_lines):]).strip()
    
    slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    
    # Extract excerpt
    clean_content = re.sub(r'---', '', content).strip()
    excerpt = clean_content[:120] + "..."
    
    image_url = f"https://source.unsplash.com/800x600/?technology,business,digital&sig={i+1}"
    
    blogs.append({
        "id": i + 1,
        "title": title,
        "slug": slug,
        "excerpt": excerpt,
        "content": content,
        "date": "May 1, 2026",
        "author": "Climbird Team",
        "imageUrl": image_url
    })

os.makedirs('src/data', exist_ok=True)
with open('src/data/blogs.json', 'w', encoding='utf-8') as f:
    json.dump(blogs, f, indent=2)

print(f"Extracted {len(blogs)} blogs.")
