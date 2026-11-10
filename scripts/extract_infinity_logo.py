import cv2
import numpy as np
from PIL import Image
import os

src_path = 'C:/Users/atlur/.gemini/antigravity/brain/2d62e249-b353-49a8-9517-f206f53088a6/.user_uploaded/media_1794035966522_63c06053.png'
im_orig = Image.open(src_path)
arr_orig = np.array(im_orig)

# Crop exact emblem area:
# X: 180 to 520 (width = 340)
# Y: 60 to 305 (height = 245)
crop = arr_orig[60:305, 180:520]
h, w = crop.shape[:2]
bgr = cv2.cvtColor(crop, cv2.COLOR_RGBA2BGR)

# Initialize GrabCut mask
mask = np.full((h, w), cv2.GC_BGD, dtype=np.uint8)

# Polygon enclosing the complete emblem
pts_outer = [
    # Left snout & whiskers
    [10, 85], [8, 65], [14, 50], [22, 38], [28, 28],
    # Top horns
    [32, 12], [42, 18], [52, 28], [63, 14], [76, 12], [84, 25], [92, 30],
    # Neck gold arch
    [105, 34], [125, 26], [145, 22], [165, 22], [180, 24],
    # Top red loop
    [195, 28], [215, 32], [240, 32], [265, 32], [285, 26],
    # Top-right cloud swirl
    [295, 26], [312, 28], [322, 38], [320, 52], [305, 58],
    # Right curve of red dragon body
    [315, 75], [325, 100], [328, 125], [324, 145], [312, 165], [295, 178],
    # Bottom loop curve
    [275, 182], [250, 180], [230, 170],
    # Below '27'
    [218, 178], [222, 198], [210, 225], [180, 235], [150, 225], [142, 195], [142, 175],
    # Bottom waves & dragon belly
    [130, 180], [115, 205], [90, 208], [60, 208], [40, 200], [25, 185], [12, 170],
    # Left edge of wave and letter S
    [5, 150], [3, 130], [8, 105]
]

poly_mask = np.zeros((h, w), np.uint8)
cv2.fillPoly(poly_mask, [np.array(pts_outer, np.int32)], 255)

# Inside polygon is PROBABLE FOREGROUND
mask[poly_mask == 255] = cv2.GC_PR_FGD

# Definite foreground seeds:
# Letters "SUPRAGNA"
mask[100:145, 18:255] = cv2.GC_FGD
# Number "27"
mask[175:220, 148:210] = cv2.GC_FGD
# Dragon head & jaw
mask[40:85, 28:80] = cv2.GC_FGD
# Gold neck
mask[35:55, 95:170] = cv2.GC_FGD
# Top red loop
mask[35:75, 200:290] = cv2.GC_FGD
# Right red curve
mask[75:150, 285:320] = cv2.GC_FGD
# Waves
mask[160:190, 25:110] = cv2.GC_FGD

# Definite background seeds:
# Outside margin:
mask[:8, :] = cv2.GC_BGD
mask[-8:, :] = cv2.GC_BGD
mask[:, :4] = cv2.GC_BGD
mask[:, -4:] = cv2.GC_BGD
# Sun disk above dragon
mask[0:30, 110:240] = cv2.GC_BGD

# Interior holes (background showing through the infinity loops):
# Hole 1: Top-left loop hole (above letters U-P)
mask[65:98, 88:125] = cv2.GC_BGD
# Hole 2: Top-right loop hole (above letters G-N-A)
mask[65:98, 230:268] = cv2.GC_BGD
# Hole 3: Bottom-right loop hole (below G-N-A, inside red loop)
mask[142:168, 238:275] = cv2.GC_BGD
# Hole 4: Under S-U (between wave crests & neck)
mask[135:158, 75:105] = cv2.GC_BGD
# Hole 5: Left of 27
mask[175:215, 115:145] = cv2.GC_BGD
# Hole 6: Right of 27
mask[175:215, 212:240] = cv2.GC_BGD

# Run GrabCut
bgdModel = np.zeros((1, 65), np.float64)
fgdModel = np.zeros((1, 65), np.float64)
cv2.grabCut(bgr, mask, None, bgdModel, fgdModel, 7, cv2.GC_INIT_WITH_MASK)

# Create binary mask
final_mask = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype('uint8')

# Keep only the largest connected component (removes any isolated stray noise)
num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(final_mask, connectivity=8)
if num_labels > 1:
    largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    clean_mask = np.where(labels == largest_label, 255, 0).astype('uint8')
else:
    clean_mask = final_mask

# Soft edge feathering
feathered = cv2.GaussianBlur(clean_mask, (3, 3), 0)

# Build transparent RGBA
rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
rgba = np.dstack([rgb, feathered])

# Save outputs
# Resolve base dir properly
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pub_img = os.path.join(base_dir, 'public', 'images')

out_png = os.path.join(pub_img, 'supragna_infinity_logo.png')
out_webp = os.path.join(pub_img, 'supragna_infinity_logo.webp')
out_banner_png = os.path.join(pub_img, 'supragna_banner_isolated.png')
out_banner_webp = os.path.join(pub_img, 'supragna_banner_isolated.webp')

Image.fromarray(rgba).save(out_png)
Image.fromarray(rgba).save(out_webp, quality=95)
Image.fromarray(rgba).save(out_banner_png)
Image.fromarray(rgba).save(out_banner_webp, quality=95)

# Also save copies in artifacts
artifact_dir = 'C:/Users/atlur/.gemini/antigravity/brain/2d62e249-b353-49a8-9517-f206f53088a6'
Image.fromarray(rgba).save(os.path.join(artifact_dir, 'supragna_infinity_logo.png'))

# Composite on dark & white for instant review
white_bg = Image.new('RGB', (w, h), (255, 255, 255))
white_bg.paste(Image.fromarray(rgba), (0, 0), Image.fromarray(rgba))
white_bg.save(os.path.join(artifact_dir, 'infinity_logo_on_white.png'))

dark_bg = Image.new('RGB', (w, h), (25, 18, 35))
dark_bg.paste(Image.fromarray(rgba), (0, 0), Image.fromarray(rgba))
dark_bg.save(os.path.join(artifact_dir, 'infinity_logo_on_dark.png'))

print('Infinity logo extracted successfully! Width:', w, 'Height:', h)
