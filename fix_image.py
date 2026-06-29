from PIL import Image

# Use the original image
img_path = 'public/images/residencia_fogo.png'
img = Image.open(img_path).convert('RGBA')
data = img.getdata()
width, height = img.size

new_data = []
orange_pixels = []

for y in range(height):
    for x in range(width):
        r, g, b, a = data[y * width + x]
        # Detect fire icon (orange/reddish)
        if a > 100 and r > 200 and g > 100 and b < 150:
            orange_pixels.append((x, y))
            new_data.append((0, 0, 0, 0)) # Erase it
        else:
            new_data.append((r, g, b, a))

img.putdata(new_data)

if orange_pixels:
    xs = [p[0] for p in orange_pixels]
    ys = [p[1] for p in orange_pixels]
    print(f"Fire icon found at X:{min(xs)}-{max(xs)}, Y:{min(ys)}-{max(ys)}")

# Now find the true bounding box of the structure
bbox_pixels = []
for y in range(height):
    for x in range(width):
        r, g, b, a = new_data[y * width + x]
        if a > 100:
            bbox_pixels.append((x, y))

if bbox_pixels:
    xs = [p[0] for p in bbox_pixels]
    ys = [p[1] for p in bbox_pixels]
    
    # Crop to just the structure
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    
    # Add a small padding (5%)
    w = max_x - min_x
    h = max_y - min_y
    pad_w = int(w * 0.05)
    pad_h = int(h * 0.05)
    
    crop_box = (
        max(0, min_x - pad_w),
        max(0, min_y - pad_h),
        min(width, max_x + pad_w),
        min(height, max_y + pad_h)
    )
    
    img_cropped = img.crop(crop_box)
    
    # Save as new filename to bust Next.js cache
    new_path = 'public/images/resistencia_fogo_fixed.png'
    img_cropped.save(new_path)
    print(f"Saved cropped image to {new_path}")
else:
    print("Image is entirely empty.")
