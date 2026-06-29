from PIL import Image

# Load the image
img_path = 'public/images/residencia_fogo.png'
img = Image.open(img_path).convert('RGBA')

# Get pixels
data = img.getdata()
new_data = []

for item in data:
    r, g, b, a = item
    # Check if pixel is orange (fire icon)
    # Fire icon is likely orange/red: R > 150, G < R - 20, B < 100
    if r > 150 and g < r - 20 and b < 100 and a > 50:
        new_data.append((0, 0, 0, 0)) # Make transparent
    else:
        new_data.append(item)

# Update image data
img.putdata(new_data)

# Get bounding box of non-transparent area
bbox = img.getbbox()

if bbox:
    # Add a small padding (e.g., 5%)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    pad_w = int(w * 0.05)
    pad_h = int(h * 0.05)
    
    # New box with padding
    crop_box = (
        max(0, bbox[0] - pad_w),
        max(0, bbox[1] - pad_h),
        min(img.width, bbox[2] + pad_w),
        min(img.height, bbox[3] + pad_h)
    )
    
    img_cropped = img.crop(crop_box)
    img_cropped.save(img_path)
    print("Image processed successfully: orange icon removed and cropped.")
else:
    print("Image is entirely empty.")
