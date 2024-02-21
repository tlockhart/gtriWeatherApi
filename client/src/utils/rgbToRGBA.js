// Translate hex string to RGBA string with supplied alpha
export const rgbToRGBA = (rgb, alpha) => {
    
    return rgb.replace('rgb', 'rgba').replace(')', `, ${alpha})`)
  };