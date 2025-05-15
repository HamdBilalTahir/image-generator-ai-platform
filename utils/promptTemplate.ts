export const assemblePrompt = (formData: Record<string, any>): string => {
  return `
    Generate a photorealistic marketing image with:
    - Brand colors: Purple (#800080) & Yellow (#FFFF00)
    - Product: ${formData.productType}
    - Background: ${formData.backgroundStyle}, soft diffused lighting, slight blur
    - Slogan: "${formData.sloganText}" (use Lobster font if custom font fails)
    - Ambassadors: ${formData.ambassadorDescriptions}
    - Focal assets: ${formData.logoUrl}
    - Composition: Two ambassadors, 4×4 ft kiosk, centered packaging
  `;
};
