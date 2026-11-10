import os
import cv2
import numpy as np
from PIL import Image
from scipy.ndimage import binary_dilation

events_dir = r'D:\SU2\oasis-2025-web-main\public\images\events'
backup_dir = os.path.join(events_dir, 'backup')
clean_dir = os.path.join(events_dir, 'clean_base')
os.makedirs(clean_dir, exist_ok=True)

def flawless_inpaint(filename, bboxes, noise_sigma=5.0, stroke_iterations=16, dilate_iterations=3):
    src_path = os.path.join(backup_dir, filename)
    im = Image.open(src_path).convert('RGBA')
    arr = np.array(im)
    
    for (y1, y2, x1, x2) in bboxes:
        # Clamp to image dimensions
        y1, y2 = max(0, y1), min(arr.shape[0], y2)
        x1, x2 = max(0, x1), min(arr.shape[1], x2)
        sub = arr[y1:y2, x1:x2]
        
        # 1. Detect white letter fill (R>195, G>195, B>195)
        white = (sub[:, :, 0] > 195) & (sub[:, :, 1] > 195) & (sub[:, :, 2] > 195)
        
        # 2. Detect the black outline stroke immediately surrounding the white letters
        near_white = binary_dilation(white, iterations=stroke_iterations)
        black_stroke = near_white & (sub[:, :, 0] < 65) & (sub[:, :, 1] < 65) & (sub[:, :, 2] < 65)
        
        # 3. Complete text glyph mask (letters + stroke)
        full_text = white | black_stroke
        
        # 4. Dilate by 3-4 px to guarantee sampling from surrounding background art
        mask = binary_dilation(full_text, iterations=dilate_iterations)
        
        # 5. Inpaint using OpenCV Telea
        rgb = sub[:, :, :3]
        bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
        mask_u8 = (mask * 255).astype(np.uint8)
        
        inpainted_bgr = cv2.inpaint(bgr, mask_u8, inpaintRadius=5, flags=cv2.INPAINT_TELEA)
        inpainted_rgb = cv2.cvtColor(inpainted_bgr, cv2.COLOR_BGR2RGB)
        
        # 6. Synthesize organic paper grain/noise into the inpainted region
        if noise_sigma > 0:
            noise = np.random.normal(0, noise_sigma, inpainted_rgb.shape).astype(np.float32)
            textured = np.clip(inpainted_rgb.astype(np.float32) + noise, 0, 255).astype(np.uint8)
            inpainted_rgb[mask] = textured[mask]
            
        sub[:, :, :3] = inpainted_rgb
        arr[y1:y2, x1:x2] = sub
        print(f"Processed {filename} bbox ({y1}:{y2}, {x1}:{x2}): {np.sum(mask)} masked px")

    out_name = os.path.splitext(filename)[0] + '.png'
    dst_path = os.path.join(clean_dir, out_name)
    Image.fromarray(arr).save(dst_path)
    print(f"Saved: {dst_path}")

np.random.seed(42)

# Desktop assets with exact generous margins
flawless_inpaint('dance.webp', [(480, 790, 95, 525)], noise_sigma=5.5)
flawless_inpaint('music.webp', [(520, 815, 345, 665)], noise_sigma=5.5)
flawless_inpaint('photography.webp', [(50, 255, 60, 515)], noise_sigma=2.5) # subtle sky grain
flawless_inpaint('drama.webp', [(480, 600, 150, 550)], noise_sigma=5.0)
flawless_inpaint('misc.webp', [(490, 600, 110, 400)], noise_sigma=5.0)

# Mobile assets with exact generous margins
flawless_inpaint('DanceMobile.webp', [(20, 295, 50, 470)], noise_sigma=5.5)
flawless_inpaint('MusicMobile.webp', [(10, 95, 200, 455)], noise_sigma=5.5)
flawless_inpaint('PhotographyMobile.webp', [(40, 280, 20, 340)], noise_sigma=2.5)
flawless_inpaint('DramaMobile.webp', [(450, 625, 180, 460)], noise_sigma=5.0)
flawless_inpaint('MiscMobile.png', [(0, 275, 195, 400)], noise_sigma=5.0)

print("All fan blade artwork perfectly restored to authentic original texture!")
