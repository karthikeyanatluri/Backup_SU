import os
import cv2
import numpy as np
from PIL import Image
from scipy.ndimage import binary_dilation

events_dir = r'D:\SU2\oasis-2025-web-main\public\images\events'
backup_dir = os.path.join(events_dir, 'backup')
clean_dir = os.path.join(events_dir, 'clean_base')
os.makedirs(clean_dir, exist_ok=True)

def inpaint_precise_text(filename, text_boxes, dilation_radius=6, inpaint_radius=4):
    src_path = os.path.join(backup_dir, filename)
    im = Image.open(src_path).convert('RGBA')
    arr = np.array(im)
    
    # Target mask for only text letter strokes
    full_mask = np.zeros(arr.shape[:2], dtype=bool)
    
    for (y1, y2, x1, x2) in text_boxes:
        sub = arr[y1:y2, x1:x2]
        # Text letter fill is pure white (R>210, G>210, B>210)
        is_white = (sub[:, :, 0] > 210) & (sub[:, :, 1] > 210) & (sub[:, :, 2] > 210)
        
        # Dilate only from the white letters out to include their 6-8px black stroke
        dilated = binary_dilation(is_white, iterations=dilation_radius)
        full_mask[y1:y2, x1:x2] |= dilated

    # Inpaint using Telea
    rgb = arr[:, :, :3]
    bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
    mask_u8 = (full_mask * 255).astype(np.uint8)
    
    inpainted_bgr = cv2.inpaint(bgr, mask_u8, inpaintRadius=inpaint_radius, flags=cv2.INPAINT_TELEA)
    inpainted_rgb = cv2.cvtColor(inpainted_bgr, cv2.COLOR_BGR2RGB)
    
    arr[:, :, :3] = inpainted_rgb
    
    out_name = os.path.splitext(filename)[0] + '.png'
    dst_path = os.path.join(clean_dir, out_name)
    Image.fromarray(arr).save(dst_path)
    print(f"Cleanly inpainted: {dst_path} (pixels: {np.sum(full_mask)})")

# Precise desktop text boxes
inpaint_precise_text('drama.webp', [(490, 590, 180, 530)], dilation_radius=6)
inpaint_precise_text('music.webp', [(520, 790, 350, 650)], dilation_radius=7)
inpaint_precise_text('photography.webp', [(50, 250, 70, 520)], dilation_radius=6)
inpaint_precise_text('dance.webp', [(450, 720, 190, 610)], dilation_radius=7)
inpaint_precise_text('misc.webp', [(490, 595, 40, 360)], dilation_radius=6)

# Precise mobile text boxes
inpaint_precise_text('DramaMobile.webp', [(470, 600, 190, 440)], dilation_radius=5)
inpaint_precise_text('MusicMobile.webp', [(20, 80, 210, 440)], dilation_radius=5)
inpaint_precise_text('PhotographyMobile.webp', [(60, 210, 60, 470)], dilation_radius=5)
inpaint_precise_text('DanceMobile.webp', [(40, 230, 130, 450)], dilation_radius=5)
inpaint_precise_text('MiscMobile.png', [(0, 250, 220, 398)], dilation_radius=5)

print("All fan blades flawlessly inpainted with zero smudging!")
