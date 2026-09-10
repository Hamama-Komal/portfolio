"""Cut public/img/me.webp out of assets/me.png.

The photo was taken against a dark blue backdrop. Rather than tracing a hard
silhouette — which leaves a jagged edge along a headscarf — the backdrop is
identified by how blue a pixel is (blue minus red) and faded to transparent
across a narrow band.

Measured on this photograph: the backdrop sits at b-r 48-62, the fabric at
b-r 3-14. Ramping between 24 and 36 puts the transition in the empty space
between those two populations, so the cloth never speckles and the backdrop
never survives in patches.

The half-transparent edge pixels are then un-matted: the backdrop's own colour
is divided back out, so the cut-out carries no blue fringe onto light paper.
One transparent file serves both themes, which is why there is no longer a
me-light/me-dark pair to keep in step with the palette.

Run with:  python scripts/make-portrait.py
"""

from PIL import Image
import numpy as np

SOURCE = "assets/me.png"
OUTPUT = "public/img/me.webp"

BACKDROP = (10.0, 37.0, 58.0)  # sampled from the corners of the source
RAMP_LOW = 24.0  # below this a pixel is subject
RAMP_HIGH = 36.0  # above this a pixel is backdrop
SIZE = 800  # comfortably over the 2x of the largest slot the page uses


def build():
    source = np.asarray(Image.open(SOURCE).convert("RGB")).astype(np.float32)

    blueness = source[:, :, 2] - source[:, :, 0]
    t = np.clip((blueness - RAMP_LOW) / (RAMP_HIGH - RAMP_LOW), 0.0, 1.0)
    alpha = 1.0 - t * t * (3.0 - 2.0 * t)  # smoothstep; 1 = keep, 0 = drop

    backdrop = np.array(BACKDROP, dtype=np.float32)
    safe = np.maximum(alpha, 1e-3)[:, :, None]
    foreground = np.clip((source - backdrop * (1.0 - safe)) / safe, 0, 255)

    rgba = np.dstack([foreground, alpha * 255.0]).astype(np.uint8)
    image = Image.fromarray(rgba, "RGBA").resize((SIZE, SIZE), Image.LANCZOS)
    image.save(OUTPUT, "WEBP", quality=82, method=6, exact=True)

    print(f"{OUTPUT} — {SIZE}x{SIZE}, {round(float((alpha > 0.99).mean()) * 100)}% opaque")


if __name__ == "__main__":
    build()
