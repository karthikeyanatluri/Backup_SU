import os
import cv2
from PIL import Image
import numpy as np
from scipy.ndimage import binary_dilation

events_dir = os.path.abspath('oasis-2025-web-main/public/images/events')
if not os.path.exists(events_dir):
    events_dir = os.path.abspath('public/images/events')

backup_dir = os.path.join(events_dir, 'backup')
clean_dir = os.path.join(events_dir, 'clean_base')
os.makedirs(clean_dir, exist_ok=True)

def inpaint_image(filename, bboxes, iterations=3, radius=5):
    src_path = os.path.join(backup_dir, filename)
    im = Image.open(src_path).convert('RGBA')
    arr = np.array(im)

    for (y1, y2, x1, x2) in bboxes:
        sub = arr[y1:y2, x1:x2]
        # Text is characterized by bright white fill or dark stroke
        is_white = (sub[:, :, :3] > 210).all(axis=2)
        is_black = (sub[:, :, :3] < 70).all(axis=2)
        text_mask = is_white | is_black
        text_mask = binary_dilation(text_mask, iterations=iterations)

        # OpenCV Navier-Stokes / Telea inpainting: smoothly flows gradients & textures into masked region
        rgb = sub[:, :, :3]
        bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
        mask_u8 = (text_mask * 255).astype(np.uint8)
        inpainted_bgr = cv2.inpaint(bgr, mask_u8, inpaintRadius=radius, flags=cv2.INPAINT_TELEA)
        inpainted_rgb = cv2.cvtColor(inpainted_bgr, cv2.COLOR_BGR2RGB)

        sub[:, :, :3] = inpainted_rgb
        arr[y1:y2, x1:x2] = sub

    out_name = filename.replace('.webp', '.png').replace('.png', '.png')
    dst_path = os.path.join(clean_dir, out_name)
    Image.fromarray(arr).save(dst_path)
    print(f"OpenCV inpainted and saved: {dst_path}")

# Inpaint desktop images
inpaint_image('drama.webp', [(490, 585, 160, 540)], iterations=3, radius=5)
inpaint_image('music.webp', [(520, 810, 350, 660)], iterations=3, radius=6)
inpaint_image('photography.webp', [(60, 260, 70, 510)], iterations=3, radius=5)
inpaint_image('dance.webp', [(450, 750, 180, 700)], iterations=3, radius=6)
inpaint_image('misc.webp', [(480, 600, 0, 380)], iterations=3, radius=5)

# Inpaint mobile images
inpaint_image('DramaMobile.webp', [(460, 610, 190, 450)], iterations=3, radius=5)
inpaint_image('MusicMobile.webp', [(20, 80, 210, 450)], iterations=3, radius=5)
inpaint_image('PhotographyMobile.webp', [(50, 220, 50, 480)], iterations=3, radius=5)
inpaint_image('DanceMobile.webp', [(35, 240, 120, 460)], iterations=3, radius=5)
inpaint_image('MiscMobile.png', [(10, 90, 200, 410)], iterations=3, radius=5)

print("All base images smoothly inpainted with OpenCV!")
