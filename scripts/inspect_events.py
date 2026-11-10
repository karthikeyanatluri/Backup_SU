import re

with open(r'D:\SU2\oasis-2025-web-main\src\utils\supragna2k27Data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

events = re.findall(r'name:\s*"([^"]+)",\s*category:', text)
print(f'Total events: {len(events)}')
for e in events:
    print('  *', e)

