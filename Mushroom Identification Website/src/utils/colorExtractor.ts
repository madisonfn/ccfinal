export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export function extractColorsFromImage(imageSrc: string): Promise<ColorPalette> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve(getDefaultPalette());
        return;
      }

      // Use smaller canvas for better performance
      const size = 100;
      canvas.width = size;
      canvas.height = size;
      
      ctx.drawImage(img, 0, 0, size, size);
      
      try {
        const imageData = ctx.getImageData(0, 0, size, size);
        const pixels = imageData.data;
        
        // Sample colors from different areas
        const colors: { r: number; g: number; b: number; count: number }[] = [];
        
        // Sample every 10th pixel to get representative colors
        for (let i = 0; i < pixels.length; i += 40) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];
          
          // Skip transparent and very dark/light pixels
          if (a > 200 && r + g + b > 50 && r + g + b < 700) {
            colors.push({ r, g, b, count: 1 });
          }
        }
        
        // Get dominant colors
        const sorted = colors.sort((a, b) => {
          const aSat = getSaturation(a.r, a.g, a.b);
          const bSat = getSaturation(b.r, b.g, b.b);
          return bSat - aSat;
        });
        
        if (sorted.length >= 3) {
          const primary = sorted[0];
          const secondary = sorted[Math.floor(sorted.length / 2)];
          const accent = sorted[sorted.length - 1];
          
          resolve({
            primary: `rgb(${primary.r}, ${primary.g}, ${primary.b})`,
            secondary: `rgb(${secondary.r}, ${secondary.g}, ${secondary.b})`,
            accent: `rgb(${accent.r}, ${accent.g}, ${accent.b})`,
            background: `rgb(${Math.min(primary.r + 230, 255)}, ${Math.min(primary.g + 230, 255)}, ${Math.min(primary.b + 230, 255)})`,
            text: `rgb(${Math.max(primary.r - 150, 20)}, ${Math.max(primary.g - 150, 20)}, ${Math.max(primary.b - 150, 20)})`
          });
        } else {
          resolve(getDefaultPalette());
        }
      } catch (e) {
        console.error('Error extracting colors:', e);
        resolve(getDefaultPalette());
      }
    };
    
    img.onerror = () => {
      resolve(getDefaultPalette());
    };
    
    img.src = imageSrc;
  });
}

function getSaturation(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max - min;
}

function getDefaultPalette(): ColorPalette {
  return {
    primary: 'rgb(139, 111, 71)',
    secondary: 'rgb(212, 184, 150)',
    accent: 'rgb(245, 239, 228)',
    background: 'rgb(253, 250, 245)',
    text: 'rgb(61, 43, 31)'
  };
}
