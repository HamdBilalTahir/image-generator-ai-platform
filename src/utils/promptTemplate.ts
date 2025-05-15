export const assemblePrompt = (formData: Record<string, any>): string => {
  return `
    Generate a photorealistic marketing image with:
    - Brand colors: ${formData.brandPalette}\n
    - Product: ${formData.productType}\n
    - Background: ${formData.backgroundStyle}\n
    - Slogan: "${formData.sloganText}"\n
    - Detailed Description: ${formData.description}
    - Image Angle: ${formData.angle}
    - Make sure there are no spelling mistakes for general text 
  `;
};
