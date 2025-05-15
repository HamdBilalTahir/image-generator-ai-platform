import React, { useState, useEffect } from 'react';

const GuidedForm: React.FC = () => {
  const [brandPalette, setBrandPalette] = useState('');
  const [productType, setProductType] = useState('');
  const [backgroundStyle, setBackgroundStyle] = useState('');
  const [slogan, setSlogan] = useState('');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [packagingMockupUrl, setPackagingMockupUrl] = useState('');
  const [imageSize, setImageSize] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      brandPalette !== '' &&
      productType !== '' &&
      backgroundStyle !== '' &&
      slogan.trim() !== '' &&
      logoUrl.trim() !== ''
    );
  }, [brandPalette, productType, backgroundStyle, slogan, logoUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission and image generation
    console.log({
      brandPalette,
      productType,
      backgroundStyle,
      slogan,
      description,
      logoUrl,
      packagingMockupUrl
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded-lg p-6 space-y-4 text-white">
      <div className="space-y-4">
  <div>
    <label className="block text-sm font-medium">Brand Palette:</label>
    <input type="text" value={brandPalette} onChange={(e) => setBrandPalette(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
  </div>

  <div>
    <label className="block text-sm font-medium">Product Type:</label>
    <input type="text" value={productType} onChange={(e) => setProductType(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
  </div>

  <div>
    <label className="block text-sm font-medium">Background/Environment:</label>
    <input type="text" value={backgroundStyle} onChange={(e) => setBackgroundStyle(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
  </div>

  <div>
    <label className="block text-sm font-medium">Slogan Text:</label>
    <input type="text" value={slogan} onChange={(e) => setSlogan(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
  </div>

  <div>
    <label className="block text-sm font-medium">Logo File:</label>
    <input type="file" accept="image/*,.pdf" onChange={(e) => {
      if (e.target.files && e.target.files.length > 0) {
        setLogoUrl(e.target.files[0].name);
      }
    }} required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
  </div>

  <div>
    <label className="block text-sm font-medium">Theme File:</label>
    <input type="file" accept="image/*,.pdf" onChange={(e) => {
      if (e.target.files && e.target.files.length > 0) {
        setPackagingMockupUrl(e.target.files[0].name);
      }
    }} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
  </div>

  <div> 
    <label className="block text-sm font-medium">Image Size:</label>
    <select value={imageSize} onChange={(e) => setImageSize(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50">
      <option value="" disabled>Select Image Size</option>
      <option value="1024x1024">1024x1024</option>
      <option value="1536x1024">1536x1024</option>
      <option value="1024x1536">1024x1536</option>
      <option value="auto">Auto</option>
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium">Detailed description:</label>
    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
  </div>
</div>

<button type="submit" disabled={!isFormValid || imageSize === ''} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm disabled:opacity-50">
  Generate Image
</button>
    </form>
  );
};

export default GuidedForm;
