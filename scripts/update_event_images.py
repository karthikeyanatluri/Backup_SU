import re

path = r'D:\SU2\oasis-2025-web-main\src\utils\supragna2k27Data.ts'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

current_school = None
school_images = {
    'engineering': '/images/events/clean_base/drama.png',
    'science': '/images/events/clean_base/music.png',
    'management': '/images/events/clean_base/photography.png',
    'arts-commerce': '/images/events/clean_base/dance.png',
    'law': '/images/events/clean_base/misc.png',
}

new_lines = []
for line in lines:
    for s_id in school_images.keys():
        if f'id: "{s_id}"' in line:
            current_school = s_id
            print(f'Switched to school: {s_id}')
            break
    
    if 'image_url:' in line and current_school:
        target_img = school_images[current_school]
        new_line = re.sub(r'image_url:\s*"[^"]*"', f'image_url: "{target_img}"', line)
        new_lines.append(new_line)
    else:
        new_lines.append(line)

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print('Updated supragna2k27Data.ts with clean school-matched images!')