import json
import re

with open('src/data/blogs.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)

for blog in blogs:
    old_title = blog['title']
    
    # Try to find the real title (usually ends at ?, or ) or ?)
    # Let's just match the first sentence or two until a known boundary.
    if blog['id'] == 1:
        real_title = "Why Your Website Isn't Getting Leads (And How to Fix It Fast in 2026)"
    elif blog['id'] == 2:
        real_title = "Struggling to Rank on Google? 7 Proven SEO Fixes That Actually Work"
    elif blog['id'] == 3:
        real_title = "Google Business Profile Suspended? Here's Exactly How to Recover It Quickly"
    elif blog['id'] == 4:
        real_title = "No Time for Customer Support? How AI Agents Can Handle 80% of Your Queries"
    elif blog['id'] == 5:
        real_title = "WordPress vs Custom Web Design: Which One Will Grow Your Business Faster?"
    elif blog['id'] == 6:
        real_title = "Local SEO in 2026: How to Dominate Your Area and Get More Calls"
    else:
        real_title = old_title.split('.')[0]
        
    # The rest of the old_title goes into content
    rest_of_text = old_title[len(real_title):].strip()
    
    blog['title'] = real_title
    # Re-create slug
    slug = re.sub(r'[^a-z0-9]+', '-', real_title.lower()).strip('-')
    blog['slug'] = slug
    
    # Prepend rest_of_text to content
    if rest_of_text:
        blog['content'] = rest_of_text + "\n\n" + blog['content']
        
    # Update excerpt
    blog['excerpt'] = blog['content'][:150] + "..."

with open('src/data/blogs.json', 'w', encoding='utf-8') as f:
    json.dump(blogs, f, indent=2)
print("Fixed blogs.json")
