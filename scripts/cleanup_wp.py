import os
import re
from bs4 import BeautifulSoup, Comment

def clean_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')

    # 1. Remove all comments
    for comment in soup.find_all(string=lambda text: isinstance(text, Comment)):
        comment.extract()

    # 2. Unwrap all div tags (keep content, remove the tag)
    for div in soup.find_all('div'):
        div.unwrap()

    # 3. Strip all attributes from all remaining tags
    # Except for essential ones like src, href
    allowed_attrs = ['src', 'href', 'alt', 'title', 'autoplay', 'loop', 'muted', 'playsinline', 'controls', 'type']
    for tag in soup.find_all(True):
        tag.attrs = {name: value for name, value in tag.attrs.items() if name in allowed_attrs}

    # 4. Remove empty tags (except purposeful ones like <source> or <img>)
    for tag in soup.find_all(True):
        if not tag.contents and tag.name not in ['img', 'br', 'hr', 'source', 'video', 'iframe']:
            tag.extract()

    # 5. Clean up the resulting string
    result = soup.decode(formatter=None)
    
    # Simple conversion of clean HTML headings to Markdown if they are top-level
    result = re.sub(r'<h1>(.*?)</h1>', r'# \1', result)
    result = re.sub(r'<h2>(.*?)</h2>', r'## \1', result)
    result = re.sub(r'<h3>(.*?)</h3>', r'### \1', result)
    result = re.sub(r'<h4>(.*?)</h4>', r'#### \1', result)
    
    return result

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        file_content = f.read()

    # Split frontmatter
    parts = file_content.split('---', 2)
    if len(parts) >= 3:
        frontmatter = parts[1]
        body = parts[2]
        
        cleaned_body = clean_html(body)
        
        # Final formatting: reduce excessive whitespace
        cleaned_body = re.sub(r'\n{3,}', '\n\n', cleaned_body)
        
        new_content = f'---\n{frontmatter}\n---\n\n{cleaned_body.strip()}\n'
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

def main():
    directory = 'src/content/pages'
    for filename in sorted(os.listdir(directory)):
        if filename.endswith('.md'):
            print(f'Surgical cleaning of {filename}...')
            try:
                clean_file(os.path.join(directory, filename))
            except Exception as e:
                print(f'Error cleaning {filename}: {e}')

if __name__ == "__main__":
    main()
