import re
import os

with open(r'd:\SU2\oasis-2025-web-main\src\utils\supragna2k27Data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Find all department definitions in engineering
eng_match = re.search(r'id:\s*["\']engineering["\'].*?departments:\s*\[(.*?)\]\s*\},', text, re.DOTALL)
if eng_match:
    eng_depts = eng_match.group(1)
    dept_matches = re.findall(r'id:\s*["\']([^"\']+)["\'],\s*name:\s*["\']([^"\']+)["\'],\s*code:\s*["\']([^"\']+)["\']', eng_depts)
    print("Engineering departments:")
    for d_id, d_name, d_code in dept_matches:
        print(f"  id: {d_id} | name: {d_name} | code: {d_code}")

