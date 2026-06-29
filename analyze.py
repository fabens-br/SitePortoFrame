from PIL import Image
img = Image.open('public/images/residencia_fogo.png')
print(f"Size: {img.size}")
data = img.getdata()
orange_count = 0
for r, g, b, a in data:
    if a > 50 and r > 150 and g < 150 and b < 100:
        orange_count += 1
print(f"Orange pixels: {orange_count}")
