import sys
import subprocess

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package, "--break-system-packages"])

try:
    import pypdf
except ImportError:
    install('pypdf')
    import pypdf

reader = pypdf.PdfReader('blogs.pdf')
text = ''
for page in reader.pages:
    text += page.extract_text() + '\n\n'

with open('blogs_content.txt', 'w', encoding='utf-8') as f:
    f.write(text)
