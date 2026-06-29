from PIL import Image
import numpy as np

img = Image.open('public/images/residencia_fogo.png').convert('RGBA')
arr = np.array(img)
r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]

# More permissive orange/yellow detection
orange_mask = (r > 200) & (g > 100) & (b < 150) & (a > 100)

y_indices, x_indices = np.where(orange_mask)

if len(y_indices) > 0:
    print(f"Fire icon found at:")
    print(f"X: {x_indices.min()} to {x_indices.max()}")
    print(f"Y: {y_indices.min()} to {y_indices.max()}")
else:
    print("No fire icon found with this mask.")
