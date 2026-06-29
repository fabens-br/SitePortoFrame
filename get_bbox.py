from PIL import Image
img = Image.open('public/images/residencia_fogo.png').convert('RGBA')
bbox = img.getbbox()
print(f"Original size: {img.size}")
print(f"Non-transparent bounding box: {bbox}")
