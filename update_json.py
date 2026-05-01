import json

with open('src/data/blogs.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)

for i, blog in enumerate(blogs):
    blog['imageUrl'] = f"/images/blogs/blog_{i+1}.png"

with open('src/data/blogs.json', 'w', encoding='utf-8') as f:
    json.dump(blogs, f, indent=2)
print("Updated blogs.json")
