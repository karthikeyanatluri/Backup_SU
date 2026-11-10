import os
from PIL import Image
import numpy as np
from scipy.ndimage import distance_transform_edt, gaussian_filter

src_path = 'C:/Users/atlur/.gemini/antigravity/brain/2d62e249-b353-49a8-9517-f206f53088a6/.user_uploaded/media_1794034329738_06197bb2.jpg'
im = Image.open(src_path).convert('RGB')
arr = np.array(im).astype(float)
H, W, _ = arr.shape

# 1. Exact logo bounding box with safe padding
# Left: 216, Right: 805, Top: 92, Bottom: 412
crop_x1 = 216
crop_x2 = 806
crop_y1 = 92
crop_y2 = 412

crop = arr[crop_y1:crop_y2, crop_x1:crop_x2]
cH, cW, _ = crop.shape

r, g, b = crop[:, :, 0], crop[:, :, 1], crop[:, :, 2]
chroma = np.maximum.reduce([np.abs(r - g), np.abs(g - b), np.abs(b - r)])
brightness = (r + g + b) / 3.0

# 2. Estimate the background canvas color in this crop:
# It is smooth charcoal grey-blue
bg_r = 30.0 + (r * 0.0) # uniform baseline
bg_g = 35.0 + (g * 0.0)
bg_b = 42.0 + (b * 0.0)

# Distance in color space from the neutral dark canvas
color_dist = np.sqrt((r - 30.0)**2 + (g - 35.0)**2 + (b - 42.0)**2)

# Strong foreground features: high chroma OR high brightness OR distinct color from dark canvas
strong_fg = (chroma > 14) | (brightness > 68) | (color_dist > 45)

# Also find black outlines / dark scales inside the artwork:
# They have color_dist < 45, but they are surrounded by strong_fg!
dist_to_strong_fg = distance_transform_edt(~strong_fg)

# Pixels within 6px of strong foreground are part of the artwork (black outlines, dark scales)
art_mask = dist_to_strong_fg <= 6.0

# Outer distance from the artwork
dist_from_art = distance_transform_edt(~art_mask)

# Alpha channel:
# Inside artwork: 1.0
# Transition (from 0 to 6 pixels outside art): smooth cosine falloff
alpha = np.zeros((cH, cW), dtype=float)
alpha[dist_from_art == 0] = 1.0

feather_mask = (dist_from_art > 0) & (dist_from_art <= 6.0)
# Cosine falloff
alpha[feather_mask] = 0.5 * (1.0 + np.cos(dist_from_art[feather_mask] * (np.pi / 6.0)))

# Clean up outer border (distance > 6.0 is 0.0)
alpha[dist_from_art > 6.0] = 0.0

# Subtle blur for antialiasing
alpha = gaussian_filter(alpha, sigma=0.6)
alpha = np.clip(alpha, 0.0, 1.0)
alpha[alpha < 0.03] = 0.0

# Color decontamination: remove the dark canvas tint from semi-transparent fringe
recovered_rgb = np.copy(crop)
bg_color = np.array([30.0, 35.0, 42.0])
safe_a = np.maximum(alpha, 0.05)[:, :, None]
# Linear unblend
unblended = (crop - (1.0 - safe_a) * bg_color) / safe_a
recovered_rgb = np.where(alpha[:, :, None] < 0.95, np.clip(unblended, 0, 255), crop)

# Build RGBA
out_rgba = np.dstack([recovered_rgb, alpha * 255.0]).astype(np.uint8)
out_im = Image.fromarray(out_rgba)

# Tight crop
bbox = out_im.getbbox()
final_logo = out_im.crop(bbox)

# Save high-res master PNG
final_logo.save('public/images/supragna_banner_isolated.png')
print('Successfully saved isolated banner to public/images/supragna_banner_isolated.png! Size:', final_logo.size)

# Also save to artifact directory for verification
final_logo.save('C:/Users/atlur/.gemini/antigravity/brain/2d62e249-b353-49a8-9517-f206f53088a6/supragna_banner_isolated.png')

