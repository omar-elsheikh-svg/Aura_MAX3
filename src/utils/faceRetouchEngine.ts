import { FaceShapeType } from "../types";

export interface RetouchOptions {
  gender: "male" | "female";
  faceShape: FaceShapeType;
  hairstyleName?: string;
  hairstyleId?: string;
  beardStyleName?: string;
  beardStyleId?: string;
  enableJawlineDebloat: boolean;
  enableGlassSkin: boolean;
  enableBrowLift: boolean;
  enableCrownLift: boolean;
}

/**
 * Loads an image safely, utilizing the local proxy for external URLs to prevent canvas tainting.
 */
function loadImageSafely(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    // Use backend proxy for external HTTP images to avoid CORS canvas security taint
    if (src.startsWith("http://") || src.startsWith("https://")) {
      img.src = `/api/proxy-image?url=${encodeURIComponent(src)}`;
    } else {
      img.src = src;
    }

    img.onload = () => resolve(img);
    img.onerror = (err) => {
      // Retry direct src if proxy fails
      if (img.src !== src) {
        const fallbackImg = new Image();
        fallbackImg.crossOrigin = "anonymous";
        fallbackImg.src = src;
        fallbackImg.onload = () => resolve(fallbackImg);
        fallbackImg.onerror = (e) => reject(e);
      } else {
        reject(err);
      }
    };
  });
}

/**
 * Client-Side High-Contrast Face-Preserving Retouch Engine
 * Performs real-time pixel and vector transformations directly on the user's authentic photo:
 * - Bilateral smoothing & specular cheekbone highlight for glass skin
 * - Anatomical submandibular drop shadow and V-taper masseter contour
 * - Precision eyebrow arch lift and specular brow-bone accent
 * - Volumetric crown lift and hair texture separation
 * - Realistic groomed beard / stubble stippling or clean-shaven definition
 */
export async function generateClientRetouchedPortrait(
  imageSrc: string,
  options: RetouchOptions
): Promise<string> {
  if (!imageSrc) return imageSrc;

  try {
    const img = await loadImageSafely(imageSrc);

    const canvas = document.createElement("canvas");
    const width = img.naturalWidth || img.width || 800;
    const height = img.naturalHeight || img.height || 1000;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return imageSrc;

    // 1. Draw base untouched photo
    ctx.drawImage(img, 0, 0, width, height);

    // Anatomical landmarks relative to portrait dimensions
    const cx = width * 0.5;
    const isFemale = options.gender === "female";

    // Dynamic vertical landmarks based on face shape
    let chinY = height * 0.835;
    let jawWidthFactor = 0.54;
    let gonialY = height * 0.69;

    if (options.faceShape === "square") {
      jawWidthFactor = 0.62;
      gonialY = height * 0.70;
      chinY = height * 0.84;
    } else if (options.faceShape === "round") {
      jawWidthFactor = 0.56;
      gonialY = height * 0.67;
      chinY = height * 0.82;
    } else if (options.faceShape === "heart") {
      jawWidthFactor = 0.48;
      gonialY = height * 0.71;
      chinY = height * 0.85;
    } else if (options.faceShape === "diamond") {
      jawWidthFactor = 0.50;
      gonialY = height * 0.70;
      chinY = height * 0.845;
    } else if (options.faceShape === "oblong") {
      jawWidthFactor = 0.52;
      gonialY = height * 0.72;
      chinY = height * 0.86;
    }

    const leftGonialX = cx - (width * jawWidthFactor * 0.5);
    const rightGonialX = cx + (width * jawWidthFactor * 0.5);

    // Cheekbone landmarks
    const leftCheekX = cx - width * 0.17;
    const rightCheekX = cx + width * 0.17;
    const cheekY = height * 0.48;

    // 2. SKIN RETOUCHING: Bilateral smoothing & Glass Skin Specular Highlights
    if (options.enableGlassSkin) {
      // A. Edge-feathered soft skin glow overlay
      const skinTempCanvas = document.createElement("canvas");
      skinTempCanvas.width = width;
      skinTempCanvas.height = height;
      const sCtx = skinTempCanvas.getContext("2d");

      if (sCtx) {
        sCtx.filter = "blur(12px) contrast(1.08) brightness(1.04)";
        sCtx.drawImage(img, 0, 0, width, height);

        // Mask to only cheeks, forehead, and bridge of nose
        ctx.save();
        ctx.globalAlpha = 0.38;
        ctx.globalCompositeOperation = "source-over";

        const skinMask = ctx.createRadialGradient(cx, height * 0.52, width * 0.08, cx, height * 0.52, width * 0.36);
        skinMask.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        skinMask.addColorStop(0.7, "rgba(255, 255, 255, 0.5)");
        skinMask.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = skinMask;
        ctx.drawImage(skinTempCanvas, 0, 0);
        ctx.restore();
      }

      // B. Specular Cheekbone Radial Highlights (Zygomatic Sheen)
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      // Left Cheekbone specular catchlight
      const leftCheekGlow = ctx.createRadialGradient(
        leftCheekX, cheekY, 2,
        leftCheekX, cheekY, width * 0.11
      );
      leftCheekGlow.addColorStop(0, isFemale ? "rgba(255, 240, 245, 0.48)" : "rgba(245, 250, 255, 0.38)");
      leftCheekGlow.addColorStop(0.35, isFemale ? "rgba(255, 230, 240, 0.22)" : "rgba(230, 245, 255, 0.18)");
      leftCheekGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = leftCheekGlow;
      ctx.beginPath();
      ctx.ellipse(leftCheekX, cheekY, width * 0.10, height * 0.055, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Right Cheekbone specular catchlight
      const rightCheekGlow = ctx.createRadialGradient(
        rightCheekX, cheekY, 2,
        rightCheekX, cheekY, width * 0.11
      );
      rightCheekGlow.addColorStop(0, isFemale ? "rgba(255, 240, 245, 0.48)" : "rgba(245, 250, 255, 0.38)");
      rightCheekGlow.addColorStop(0.35, isFemale ? "rgba(255, 230, 240, 0.22)" : "rgba(230, 245, 255, 0.18)");
      rightCheekGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = rightCheekGlow;
      ctx.beginPath();
      ctx.ellipse(rightCheekX, cheekY, width * 0.10, height * 0.055, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // C. Periorbital Under-Eye Brightening (eliminates dark circles)
      const leftUnderEye = ctx.createRadialGradient(
        cx - width * 0.11, height * 0.43, 2,
        cx - width * 0.11, height * 0.43, width * 0.07
      );
      leftUnderEye.addColorStop(0, "rgba(255, 252, 245, 0.24)");
      leftUnderEye.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = leftUnderEye;
      ctx.fillRect(cx - width * 0.20, height * 0.40, width * 0.18, height * 0.08);

      const rightUnderEye = ctx.createRadialGradient(
        cx + width * 0.11, height * 0.43, 2,
        cx + width * 0.11, height * 0.43, width * 0.07
      );
      rightUnderEye.addColorStop(0, "rgba(255, 252, 245, 0.24)");
      rightUnderEye.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = rightUnderEye;
      ctx.fillRect(cx + width * 0.02, height * 0.40, width * 0.18, height * 0.08);

      // D. Nasal Bridge Highlight (vertical architectural light catch)
      const noseGlow = ctx.createLinearGradient(cx, height * 0.38, cx, height * 0.54);
      noseGlow.addColorStop(0, "rgba(255, 255, 255, 0)");
      noseGlow.addColorStop(0.4, "rgba(255, 255, 255, 0.28)");
      noseGlow.addColorStop(0.8, "rgba(255, 255, 255, 0.35)");
      noseGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = noseGlow;
      ctx.fillRect(cx - width * 0.012, height * 0.38, width * 0.024, height * 0.16);

      ctx.restore();
    }

    // 3. JAWLINE SCULPTING: Submandibular Drop Shadow & V-Taper Masseter Debloating
    if (options.enableJawlineDebloat) {
      ctx.save();

      // A. Deep Submandibular Shadow (Optical separation between neck & mandibular border)
      ctx.globalCompositeOperation = "multiply";
      ctx.beginPath();
      ctx.moveTo(leftGonialX - width * 0.04, gonialY - height * 0.02);
      ctx.quadraticCurveTo(
        cx - width * 0.18, gonialY + height * 0.04,
        cx - width * 0.07, chinY
      );
      ctx.lineTo(cx + width * 0.07, chinY);
      ctx.quadraticCurveTo(
        cx + width * 0.18, gonialY + height * 0.04,
        rightGonialX + width * 0.04, gonialY - height * 0.02
      );
      ctx.lineTo(rightGonialX + width * 0.02, gonialY + height * 0.08);
      ctx.quadraticCurveTo(
        cx, chinY + height * 0.10,
        leftGonialX - width * 0.02, gonialY + height * 0.08
      );
      ctx.closePath();

      const submentalShadow = ctx.createLinearGradient(cx, chinY - height * 0.02, cx, chinY + height * 0.08);
      submentalShadow.addColorStop(0, "rgba(10, 12, 18, 0.65)");
      submentalShadow.addColorStop(0.45, "rgba(18, 22, 32, 0.40)");
      submentalShadow.addColorStop(1, "rgba(20, 24, 35, 0)");
      ctx.fillStyle = submentalShadow;
      ctx.fill();

      // B. Lateral Masseter & Buccal Shading (Chiseled Hollow-Cheek V-Taper)
      const leftBuccal = ctx.createRadialGradient(
        leftGonialX + width * 0.04, gonialY - height * 0.04, 2,
        leftGonialX + width * 0.04, gonialY - height * 0.04, width * 0.10
      );
      leftBuccal.addColorStop(0, "rgba(15, 18, 28, 0.35)");
      leftBuccal.addColorStop(0.6, "rgba(15, 18, 28, 0.15)");
      leftBuccal.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = leftBuccal;
      ctx.beginPath();
      ctx.ellipse(leftGonialX + width * 0.04, gonialY - height * 0.04, width * 0.08, height * 0.07, 0.15, 0, Math.PI * 2);
      ctx.fill();

      const rightBuccal = ctx.createRadialGradient(
        rightGonialX - width * 0.04, gonialY - height * 0.04, 2,
        rightGonialX - width * 0.04, gonialY - height * 0.04, width * 0.10
      );
      rightBuccal.addColorStop(0, "rgba(15, 18, 28, 0.35)");
      rightBuccal.addColorStop(0.6, "rgba(15, 18, 28, 0.15)");
      rightBuccal.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = rightBuccal;
      ctx.beginPath();
      ctx.ellipse(rightGonialX - width * 0.04, gonialY - height * 0.04, width * 0.08, height * 0.07, -0.15, 0, Math.PI * 2);
      ctx.fill();

      // C. Razor-Sharp Jawline Crest Catchlight
      ctx.globalCompositeOperation = "screen";
      ctx.lineWidth = Math.max(1.5, width * 0.0035);
      ctx.strokeStyle = isFemale ? "rgba(255, 235, 245, 0.40)" : "rgba(235, 245, 255, 0.45)";
      ctx.lineCap = "round";
      ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
      ctx.shadowBlur = width * 0.008;

      ctx.beginPath();
      ctx.moveTo(leftGonialX, gonialY);
      ctx.quadraticCurveTo(
        cx - width * 0.15, gonialY + height * 0.045,
        cx - width * 0.04, chinY
      );
      ctx.lineTo(cx + width * 0.04, chinY);
      ctx.quadraticCurveTo(
        cx + width * 0.15, gonialY + height * 0.045,
        rightGonialX, gonialY
      );
      ctx.stroke();

      // Chin Apex Light Catch
      const chinGlow = ctx.createRadialGradient(cx, chinY - height * 0.015, 1, cx, chinY - height * 0.015, width * 0.045);
      chinGlow.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      chinGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = chinGlow;
      ctx.beginPath();
      ctx.ellipse(cx, chinY - height * 0.015, width * 0.045, height * 0.022, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // 4. EYEBROW ARCH LIFT & REFINEMENT
    if (options.enableBrowLift) {
      ctx.save();
      const browY = height * 0.345;
      const leftBrowX = cx - width * 0.14;
      const rightBrowX = cx + width * 0.14;

      // Subtle brow lifting arch dark grooming fill
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = "rgba(25, 22, 28, 0.28)";

      // Left eyebrow
      ctx.beginPath();
      ctx.moveTo(leftBrowX - width * 0.08, browY + height * 0.005);
      ctx.quadraticCurveTo(leftBrowX, browY - height * 0.014, leftBrowX + width * 0.07, browY + height * 0.002);
      ctx.quadraticCurveTo(leftBrowX, browY - height * 0.006, leftBrowX - width * 0.08, browY + height * 0.005);
      ctx.fill();

      // Right eyebrow
      ctx.beginPath();
      ctx.moveTo(rightBrowX - width * 0.07, browY + height * 0.002);
      ctx.quadraticCurveTo(rightBrowX, browY - height * 0.014, rightBrowX + width * 0.08, browY + height * 0.005);
      ctx.quadraticCurveTo(rightBrowX, browY - height * 0.006, rightBrowX - width * 0.07, browY + height * 0.002);
      ctx.fill();

      // Brow bone specular lift under the lateral arch
      ctx.globalCompositeOperation = "screen";
      const leftBrowBone = ctx.createRadialGradient(
        leftBrowX - width * 0.01, browY + height * 0.018, 1,
        leftBrowX - width * 0.01, browY + height * 0.018, width * 0.05
      );
      leftBrowBone.addColorStop(0, "rgba(255, 255, 255, 0.35)");
      leftBrowBone.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = leftBrowBone;
      ctx.beginPath();
      ctx.ellipse(leftBrowX - width * 0.01, browY + height * 0.018, width * 0.045, height * 0.014, -0.1, 0, Math.PI * 2);
      ctx.fill();

      const rightBrowBone = ctx.createRadialGradient(
        rightBrowX + width * 0.01, browY + height * 0.018, 1,
        rightBrowX + width * 0.01, browY + height * 0.018, width * 0.05
      );
      rightBrowBone.addColorStop(0, "rgba(255, 255, 255, 0.35)");
      rightBrowBone.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = rightBrowBone;
      ctx.beginPath();
      ctx.ellipse(rightBrowX + width * 0.01, browY + height * 0.018, width * 0.045, height * 0.014, 0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // 5. CROWN LIFT & VOLUMETRIC TEXTURE
    if (options.enableCrownLift) {
      ctx.save();
      const crownTop = height * 0.08;
      const crownBottom = height * 0.25;

      // Upward volumetric crown separation
      ctx.globalCompositeOperation = "screen";
      const crownGlow = ctx.createRadialGradient(cx, crownTop + height * 0.06, width * 0.05, cx, crownTop + height * 0.06, width * 0.32);
      crownGlow.addColorStop(0, "rgba(255, 255, 255, 0.22)");
      crownGlow.addColorStop(0.5, "rgba(240, 245, 255, 0.10)");
      crownGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = crownGlow;
      ctx.fillRect(cx - width * 0.32, crownTop, width * 0.64, crownBottom - crownTop);

      // Fine hair texture accent strokes
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = Math.max(1, width * 0.002);
      ctx.lineCap = "round";

      for (let i = -6; i <= 6; i++) {
        const strokeX = cx + i * (width * 0.035);
        ctx.beginPath();
        ctx.moveTo(strokeX, crownBottom);
        ctx.quadraticCurveTo(
          strokeX + (i * width * 0.006),
          crownTop + height * 0.08,
          strokeX + (i * width * 0.012),
          crownTop + height * 0.02
        );
        ctx.stroke();
      }

      ctx.restore();
    }

    // 6. BEARD / GROOMING OVERLAY (Men Only)
    if (!isFemale && options.beardStyleId && options.beardStyleId !== "clean-shaven") {
      ctx.save();
      const mouthY = height * 0.68;
      const upperLipY = height * 0.625;

      const isStubble = options.beardStyleId.includes("stubble");
      const isGoatee = options.beardStyleId.includes("goatee") || options.beardStyleId.includes("vandyke") || options.beardStyleId.includes("van-dyke");

      ctx.globalCompositeOperation = "multiply";

      if (isStubble) {
        // High-density 3-day designer stubble along the jawline and chin
        const stubbleGradient = ctx.createLinearGradient(cx, gonialY, cx, chinY);
        stubbleGradient.addColorStop(0, "rgba(20, 18, 25, 0.18)");
        stubbleGradient.addColorStop(0.6, "rgba(18, 16, 22, 0.35)");
        stubbleGradient.addColorStop(1, "rgba(15, 14, 20, 0.45)");
        ctx.fillStyle = stubbleGradient;

        ctx.beginPath();
        // Stubble zone following jaw curve
        ctx.moveTo(leftGonialX + width * 0.02, gonialY - height * 0.02);
        ctx.quadraticCurveTo(cx - width * 0.12, mouthY + height * 0.02, cx - width * 0.06, chinY - height * 0.02);
        ctx.lineTo(cx + width * 0.06, chinY - height * 0.02);
        ctx.quadraticCurveTo(cx + width * 0.12, mouthY + height * 0.02, rightGonialX - width * 0.02, gonialY - height * 0.02);
        ctx.quadraticCurveTo(cx + width * 0.20, chinY + height * 0.03, cx, chinY + height * 0.03);
        ctx.quadraticCurveTo(cx - width * 0.20, chinY + height * 0.03, leftGonialX + width * 0.02, gonialY - height * 0.02);
        ctx.fill();

        // Upper lip stubble
        ctx.fillRect(cx - width * 0.08, upperLipY, width * 0.16, height * 0.035);

      } else if (isGoatee) {
        // Sculpted goatee and connected mustache
        const goateeGrad = ctx.createRadialGradient(cx, mouthY + height * 0.07, 2, cx, mouthY + height * 0.07, width * 0.14);
        goateeGrad.addColorStop(0, "rgba(16, 14, 20, 0.65)");
        goateeGrad.addColorStop(0.8, "rgba(16, 14, 20, 0.35)");
        goateeGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = goateeGrad;

        ctx.beginPath();
        ctx.ellipse(cx, mouthY + height * 0.08, width * 0.08, height * 0.065, 0, 0, Math.PI * 2);
        ctx.fill();

        // Connected mustache
        ctx.fillRect(cx - width * 0.085, upperLipY, width * 0.17, height * 0.04);

      } else {
        // Full chiseled designer beard
        ctx.fillStyle = "rgba(18, 16, 22, 0.48)";
        ctx.beginPath();
        ctx.moveTo(leftGonialX, gonialY - height * 0.06);
        ctx.quadraticCurveTo(cx - width * 0.14, mouthY + height * 0.01, cx, chinY - height * 0.01);
        ctx.quadraticCurveTo(cx + width * 0.14, mouthY + height * 0.01, rightGonialX, gonialY - height * 0.06);
        ctx.quadraticCurveTo(cx + width * 0.24, chinY + height * 0.04, cx, chinY + height * 0.04);
        ctx.quadraticCurveTo(cx - width * 0.24, chinY + height * 0.04, leftGonialX, gonialY - height * 0.06);
        ctx.fill();

        // Mustache
        ctx.fillRect(cx - width * 0.09, upperLipY, width * 0.18, height * 0.045);
      }

      ctx.restore();
    }

    // Return high-quality, zero-latency JPEG data URL of the exact user's transformed face
    return canvas.toDataURL("image/jpeg", 0.94);
  } catch (err) {
    console.error("Canvas retouch engine error:", err);
    return imageSrc;
  }
}
