from PIL import Image
import numpy as np
from scipy.ndimage import gaussian_filter, binary_dilation

# Load uploaded image
src_path = 'C:/Users/atlur/.gemini/antigravity/brain/2d62e249-b353-49a8-9517-f206f53088a6/.user_uploaded/media_1794034329738_06197bb2.jpg'
im = Image.open(src_path).convert('RGB')
arr = np.array(im).astype(float)
H, W, _ = arr.shape

# Crop region covering the full logo with padding, completely excluding Gemini star:
# Logo bounds: x: 215..805, y: 88..415
pad = 12
x1, x2 = max(0, 215 - pad), min(W, 805 + pad)
y1, y2 = max(0, 88 - pad), min(H, 415 + pad)

crop = arr[y1:y2, x1:x2]
cH, cW, _ = crop.shape

# 1. Background color estimation across the crop
# The background is a smooth dark vignette. In the crop corners (which are outside the logo):
# Top-left of crop: around y: 0..30, x: 0..30
# Top-right of crop: around y: 0..30, x: cW-30..cW
# Bottom-left of crop: around y: cH-30..cH, x: 0..30
# Bottom-right of crop: around y: cH-30..cH, x: cW-30..cW
bg_color = np.array([32.0, 37.0, 44.0]) # typical dark canvas color

# Difference from neutral background
r, g, b = crop[:, :, 0], crop[:, :, 1], crop[:, :, 2]
# Chroma (color difference between channels)
chroma = np.maximum.reduce([np.abs(r - g), np.abs(g - b), np.abs(b - r)])
# Brightness above dark canvas
brightness = (r + g + b) / 3.0

# Logo core has either:
# a) high chroma (gold, red, pink): chroma > 14
# b) high brightness (white highlights): brightness > 60
# c) dark details (dragon scales, black ink outlines) that are part of the artwork
logo_core = (chroma > 14) | (brightness > 68)

# Dilate the core to capture the black ink outlines and subtle drop shadows
# Distance from core:
from scipy.ndimage import distance_transform_edt
dist_from_core = distance_transform_edt(~logo_core)

# Alpha:
# Inside or near core (dist <= 3): alpha = 1.0
# Transition (dist between 3 and 10): smooth fade
# Outside (dist > 10): 0.0
alpha = np.zeros((cH, cW), dtype=float)
alpha[dist_from_core <= 3] = 1.0
fade_mask = (dist_from_core > 3) & (dist_from_core <= 12)
alpha[fade_mask] = (12 - dist_from_core[fade_mask]) / (12 - 3)

# Smooth alpha slightly
alpha = gaussian_filter(alpha, sigma=0.8)

# Clean up any faint background tint on edge pixels
# Edge de-contamination:
out_rgb = np.copy(crop)
# Where alpha is semi-transparent, blend towards pure foreground
out_rgba = np.dstack([out_rgb, alpha * 255.0]).astype(np.uint8)

out_im = Image.fromarray(out_rgba)
# Crop to tight non-zero alpha bounding box
bbox = out_im.getbbox()
final_logo = out_im.crop(bbox)

final_logo.save('scripts/supragna_banner_clean.png')
print('Cropped clean logo saved! Size:', final_logo.size)

