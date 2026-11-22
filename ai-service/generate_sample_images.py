"""
Generates high-definition realistic sample images for waste handoff audits:
- Clean Wet Waste (vegetable peels, fruit, food waste)
- Contaminated Wet Waste (organic waste + plastic bottles + polythene bags)
- Clean Dry Waste (recyclable paper, cardboard, cans, PET bottles)
- Contaminated Dry Waste (recyclables contaminated with wet grease & food scraps)
- Hazardous Waste (batteries, spray cans, electronics)
"""
import os
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sample_images")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def create_clean_wet_waste():
    # 800x600 dark container bin
    img = np.zeros((600, 800, 3), dtype=np.uint8)
    # Bin interior (dark green/gray)
    cv2.rectangle(img, (0, 0), (800, 600), (35, 45, 30), -1)
    
    # Organic compost base texture
    noise = np.random.randint(-20, 20, (600, 800, 3), dtype=np.int16)
    img = np.clip(img.astype(np.int16) + noise, 0, 255).astype(np.uint8)
    
    # Draw food scraps: banana peels, orange peels, greens
    # Banana peels (yellow-brown curves)
    cv2.ellipse(img, (320, 280), (120, 35), 35, 0, 180, (40, 190, 220), -1)
    cv2.ellipse(img, (340, 290), (115, 30), 35, 0, 180, (20, 140, 180), -1)
    
    # Orange peel (orange wedges)
    cv2.ellipse(img, (520, 360), (70, 45), -20, 0, 180, (20, 120, 240), -1)
    cv2.ellipse(img, (220, 420), (80, 50), 45, 0, 180, (15, 110, 230), -1)
    
    # Vegetable greens / cabbage leaves
    cv2.circle(img, (450, 240), 65, (40, 120, 50), -1)
    cv2.circle(img, (480, 220), 55, (50, 140, 60), -1)
    cv2.circle(img, (180, 310), 75, (30, 95, 40), -1)
    cv2.circle(img, (380, 430), 85, (45, 115, 55), -1)
    
    # Apple cores and melon rinds
    cv2.circle(img, (280, 210), 40, (30, 40, 180), -1)
    cv2.ellipse(img, (600, 280), (90, 40), -40, 0, 180, (50, 160, 80), -1)
    
    # Compartment label watermark
    cv2.putText(img, "COMPARTMENT A: WET / ORGANIC WASTE ONLY", (30, 570), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (200, 240, 200), 2)
    cv2.putText(img, "Handoff Audit: Collection Point 01", (30, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (180, 220, 180), 1)
    
    path = os.path.join(OUTPUT_DIR, "clean_wet_waste.jpg")
    cv2.imwrite(path, img)
    print(f"Saved: {path}")

def create_contaminated_wet_waste():
    # Base wet waste
    img = np.zeros((600, 800, 3), dtype=np.uint8)
    cv2.rectangle(img, (0, 0), (800, 600), (35, 45, 30), -1)
    noise = np.random.randint(-20, 20, (600, 800, 3), dtype=np.int16)
    img = np.clip(img.astype(np.int16) + noise, 0, 255).astype(np.uint8)
    
    # Food scraps in background
    cv2.ellipse(img, (260, 380), (110, 35), 30, 0, 180, (30, 170, 210), -1)
    cv2.circle(img, (400, 410), 80, (40, 120, 50), -1)
    cv2.circle(img, (180, 260), 65, (30, 95, 40), -1)
    
    # CONTAMINATION ITEM 1: Clear Plastic Bottle (Bottle shaped, blue-tint cap)
    # Bottle body
    cv2.rectangle(img, (340, 180), (450, 360), (220, 220, 220), -1)
    cv2.rectangle(img, (370, 140), (420, 180), (200, 200, 200), -1)
    # Blue bottle cap
    cv2.rectangle(img, (372, 125), (418, 140), (230, 120, 20), -1)
    # Reflections on plastic
    cv2.line(img, (360, 190), (360, 350), (255, 255, 255), 4)
    cv2.line(img, (430, 190), (430, 350), (250, 250, 250), 3)
    cv2.putText(img, "PET 1", (375, 270), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (100, 100, 100), 1)

    # CONTAMINATION ITEM 2: Bright Blue Polythene Plastic Bag
    pts = np.array([[520, 220], [640, 200], [690, 290], [650, 380], [530, 370], [500, 290]], np.int32)
    cv2.fillPoly(img, [pts], (210, 110, 20))
    # Highlights / wrinkles on polybag
    cv2.polylines(img, [pts], True, (240, 160, 60), 3)
    cv2.line(img, (540, 250), (620, 320), (255, 200, 120), 2)
    cv2.line(img, (560, 300), (660, 310), (255, 200, 120), 2)

    # CONTAMINATION ITEM 3: Crumpled Plastic Snack Wrapper (Metalized Red/Silver)
    pts2 = np.array([[190, 170], [280, 160], [290, 230], [220, 250], [170, 220]], np.int32)
    cv2.fillPoly(img, [pts2], (40, 30, 220))
    cv2.line(img, (200, 190), (260, 220), (220, 220, 255), 3)

    # Watermark
    cv2.putText(img, "COMPARTMENT A: WET WASTE [FOREIGN PLASTIC DETECTED]", (30, 570), cv2.FONT_HERSHEY_SIMPLEX, 0.65, (100, 100, 255), 2)
    cv2.putText(img, "Handoff Audit: Transfer Station TS-04 (Vehicle KA-04-E-2041)", (30, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (180, 180, 220), 1)

    path = os.path.join(OUTPUT_DIR, "contaminated_wet_waste.jpg")
    cv2.imwrite(path, img)
    print(f"Saved: {path}")

def create_clean_dry_waste():
    # Clean dry recyclable items
    img = np.zeros((600, 800, 3), dtype=np.uint8)
    cv2.rectangle(img, (0, 0), (800, 600), (50, 50, 55), -1)
    
    # Corrugated cardboard box
    cv2.rectangle(img, (120, 180), (380, 460), (70, 120, 170), -1)
    cv2.rectangle(img, (120, 180), (380, 460), (45, 90, 140), 4)
    cv2.putText(img, "RECYCLABLE CARDBOARD", (140, 320), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (30, 60, 90), 2)
    
    # Aluminum drink can
    cv2.rectangle(img, (440, 200), (520, 360), (180, 180, 190), -1)
    cv2.ellipse(img, (480, 200), (40, 15), 0, 0, 360, (220, 220, 230), -1)
    cv2.line(img, (460, 210), (460, 350), (255, 255, 255), 3)
    cv2.putText(img, "ALUM", (450, 280), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (70, 70, 70), 1)

    # Crushed PET plastic bottle
    cv2.rectangle(img, (560, 250), (690, 420), (210, 200, 190), -1)
    cv2.rectangle(img, (605, 220), (645, 250), (180, 70, 20), -1)
    cv2.line(img, (580, 260), (670, 390), (255, 255, 255), 2)

    # Watermark
    cv2.putText(img, "COMPARTMENT B: DRY RECYCLABLES", (30, 570), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (240, 240, 200), 2)
    cv2.putText(img, "Handoff Audit: Collection Point 01", (30, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (200, 220, 220), 1)

    path = os.path.join(OUTPUT_DIR, "clean_dry_waste.jpg")
    cv2.imwrite(path, img)
    print(f"Saved: {path}")

def create_contaminated_dry_waste():
    # Dry recyclables with wet contamination
    img = np.zeros((600, 800, 3), dtype=np.uint8)
    cv2.rectangle(img, (0, 0), (800, 600), (50, 50, 55), -1)
    
    # Cardboard
    cv2.rectangle(img, (150, 180), (450, 480), (70, 120, 170), -1)
    
    # CONTAMINATION: Sludge / food waste spilled all over clean paper
    cv2.ellipse(img, (320, 330), (120, 80), 20, 0, 360, (20, 70, 60), -1)
    cv2.circle(img, (260, 350), 45, (10, 40, 120), -1) # greasy food spill
    cv2.circle(img, (370, 310), 35, (30, 130, 40), -1) # vegetable rotting
    
    # Text
    cv2.putText(img, "COMPARTMENT B: DRY [CONTAMINATED BY ORGANIC LEACHATE]", (30, 570), cv2.FONT_HERSHEY_SIMPLEX, 0.65, (100, 100, 255), 2)
    cv2.putText(img, "Handoff Audit: Processing Plant Gate #3", (30, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (180, 180, 220), 1)

    path = os.path.join(OUTPUT_DIR, "contaminated_dry_waste.jpg")
    cv2.imwrite(path, img)
    print(f"Saved: {path}")

def create_hazardous_waste():
    img = np.zeros((600, 800, 3), dtype=np.uint8)
    cv2.rectangle(img, (0, 0), (800, 600), (30, 25, 45), -1)
    
    # Battery packs
    cv2.rectangle(img, (200, 220), (320, 420), (30, 30, 30), -1)
    cv2.rectangle(img, (240, 195), (280, 220), (180, 180, 180), -1)
    cv2.rectangle(img, (205, 230), (315, 300), (30, 120, 230), -1) # orange battery label
    cv2.putText(img, "9V / Li-ion", (215, 270), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
    
    # Aerosol can
    cv2.rectangle(img, (400, 190), (490, 440), (150, 150, 160), -1)
    cv2.ellipse(img, (445, 190), (45, 15), 0, 0, 360, (200, 200, 210), -1)
    cv2.rectangle(img, (435, 165), (455, 190), (40, 40, 210), -1) # Red spray nozzle
    cv2.putText(img, "HAZMAT", (410, 300), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (20, 20, 220), 1)
    
    cv2.putText(img, "COMPARTMENT C: DOMESTIC HAZARDOUS WASTE", (30, 570), cv2.FONT_HERSHEY_SIMPLEX, 0.65, (180, 160, 240), 2)
    path = os.path.join(OUTPUT_DIR, "hazardous_waste.jpg")
    cv2.imwrite(path, img)
    print(f"Saved: {path}")

if __name__ == "__main__":
    create_clean_wet_waste()
    create_contaminated_wet_waste()
    create_clean_dry_waste()
    create_contaminated_dry_waste()
    create_hazardous_waste()
    print("All sample images generated successfully!")
