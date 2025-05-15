import React, { useState, useEffect } from 'react';

function generateRandomId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
import { assemblePrompt } from '../utils/promptTemplate';
import { generateImage } from '../utils/apiUtils';
import { generateAndSetProjectId } from '../utils/projectIdUtils';

const GuidedForm: React.FC = () => {
  const [projectId, setProjectId] = useState('');
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
    const storedProjectId = localStorage.getItem("projectId");
    if (storedProjectId) {
      setProjectId(storedProjectId);
    } else {
      const newProjectId = generateAndSetProjectId();
      setProjectId(newProjectId);
    }

    setIsFormValid(
      brandPalette !== '' &&
      productType !== '' &&
      backgroundStyle !== '' &&
      slogan.trim() !== '' &&
      logoUrl.trim() !== ''
    );
  }, [brandPalette, productType, backgroundStyle, slogan, logoUrl]);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      brandPalette,
      productType,
      backgroundStyle,
      sloganText: slogan,
      ambassadorDescriptions: description,
      logoUrl,
      packagingMockupUrl
    };
    const prompt = assemblePrompt(formData);

    try {
      const data = await generateImage(projectId, prompt, formData);
      console.log('Image generated successfully:', data);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded-lg p-6 space-y-4 text-white w-full max-w-2xl mx-auto my-8">
      <div className="space-y-4">
  <div>
    <label className="block text-sm font-medium">Brand Palette:</label>
    <textarea value={brandPalette} onChange={(e) => setBrandPalette(e.target.value)} required placeholder="e.g., Purple: #800080 background, Yellow: #FFFF00 hero text" className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2 resize-y" rows={2} />
  </div>

  <div>
    <label className="block text-sm font-medium">Product Type:</label>
    <textarea value={productType} onChange={(e) => setProductType(e.target.value)} required placeholder="e.g., Pasta Pouches, Penne & Fusilli" className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2 resize-y" rows={2} />
  </div>

  <div>
    <label className="block text-sm font-medium">Background/Environment:</label>
    <textarea value={backgroundStyle} onChange={(e) => setBackgroundStyle(e.target.value)} required placeholder="e.g., Blurred supermarket aisle with Pakistani culutural visuals, alongside Pakistani products showing up on the shelves." className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2 resize-y" rows={2} />
  </div>

  <div>
    <label className="block text-sm font-medium">Slogan Text:</label>
    <textarea value={slogan} onChange={(e) => setSlogan(e.target.value)} required placeholder="e.g., Make Meals Complete" className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2 resize-y" rows={2} />
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
    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="e.g., A 4 ft × 4 ft kiosk with Fusilli and Penne pouches with a woman and man usher standing side by side to the kiosk without any overlap. The ushers should have a distinct Pakistani ethnicity and should be wearing western employee clothes." className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2" />
  </div>
</div>

<button type="submit" disabled={!isFormValid || imageSize === ''} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm disabled:opacity-50 disabled:bg-gray-400">
  Generate Image
</button>
    </form>
  );
};

export default GuidedForm;
