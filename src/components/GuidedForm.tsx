/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { assemblePrompt } from '../utils/promptTemplate';
import { generateImage } from '../utils/apiUtils';
import { generateAndSetProjectId } from '../utils/projectIdUtils';
import { base64ToPng } from '../utils/base64ToPng';
import mockImageData from '../mock/mockImageData';

interface GuidedFormProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setGeneratedImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const GuidedForm: React.FC<GuidedFormProps> = ({
  setIsLoading,
  setGeneratedImage,
}) => {
  const [projectId, setProjectId] = useState('');
  const [brandPalette, setBrandPalette] = useState(
    'Purple: #800080 background, Yellow: #FFFF00 hero text'
  );
  const [productType, setProductType] = useState(
    'Pasta Pouches, Penne & Fusilli'
  );
  const [backgroundStyle, setBackgroundStyle] = useState(
    'Blurred supermarket aisle with Pakistani cultural visuals, alongside Pakistani products showing up on the shelves.'
  );
  const [slogan, setSlogan] = useState('Make Meals Complete');
  const [description, setDescription] = useState(
    'A 4 ft × 4 ft kiosk with Fusilli and Penne pouches with a woman and man usher standing side by side to the kiosk without any overlap. The ushers should have a distinct Pakistani ethnicity and should be wearing western employee clothes.'
  );
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [themeImage, setThemeImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imageSize, setImageSize] = useState('1024x1024');
  const [isFormValid, setIsFormValid] = useState(false);
  const [angle, setAngle] = useState('Wide');

  useEffect(() => {
    const storedProjectId = localStorage.getItem('projectId');
    if (storedProjectId) {
      setProjectId(storedProjectId);
    } else {
      const newProjectId = generateAndSetProjectId();
      setProjectId(newProjectId);
    }

    setIsFormValid(
      Boolean(
        brandPalette &&
          productType &&
          backgroundStyle &&
          slogan.trim() &&
          logoImage &&
          themeImage
      )
    );
  }, [
    brandPalette,
    productType,
    backgroundStyle,
    slogan,
    logoImage,
    themeImage,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formImages = [logoImage!, themeImage!] as File[];
    setImages(formImages);

    const formData = {
      brandPalette,
      productType,
      backgroundStyle,
      sloganText: slogan,
      description,
      images: formImages,
      imageSize,
      angle,
    };

    const prompt = assemblePrompt(formData);

    try {
      const data = await generateImage(projectId, prompt, formData);
      // const data = mockImageData.imageData;
      console.log('🚀 ~ handleSubmit ~ data:', data);
      const base64WithPrefix = `data:image/png;base64,${data[0].b64_json}`;
      const pngFile = base64ToPng(base64WithPrefix, 'generated-image.png');
      console.log('🚀 ~ handleSubmit ~ pngFile:', pngFile);
      setGeneratedImage(pngFile);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (editDetails: string) => {
    // Handle the edit details here
    console.log('Edit details:', editDetails);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 shadow-md rounded-lg p-6 space-y-6 text-white w-full max-w-2xl mx-auto my-8"
    >
      {/* Brand Palette */}
      <div>
        <label className="block text-sm font-medium">Brand Palette:</label>
        <textarea
          value={brandPalette}
          onChange={(e) => setBrandPalette(e.target.value)}
          required
          placeholder="e.g., Purple: #800080 background, Yellow: #FFFF00 hero text"
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2 resize-y"
          rows={2}
        />
      </div>

      {/* Product Type */}
      <div>
        <label className="block text-sm font-medium">Product Type:</label>
        <textarea
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          required
          placeholder="e.g., Pasta Pouches, Penne & Fusilli"
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2 resize-y"
          rows={2}
        />
      </div>

      {/* Background Style */}
      <div>
        <label className="block text-sm font-medium">
          Background/Environment:
        </label>
        <textarea
          value={backgroundStyle}
          onChange={(e) => setBackgroundStyle(e.target.value)}
          required
          placeholder="e.g., Blurred supermarket aisle with Pakistani cultural visuals..."
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2 resize-y"
          rows={2}
        />
      </div>

      {/* Slogan Text */}
      <div>
        <label className="block text-sm font-medium">Slogan Text:</label>
        <textarea
          value={slogan}
          onChange={(e) => setSlogan(e.target.value)}
          required
          placeholder="e.g., Make Meals Complete"
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2 resize-y"
          rows={2}
        />
      </div>

      {/* Logo Image */}
      <div>
        <label className="block text-sm font-medium">Sample Logo Image:</label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              const renamed = new File(
                [file],
                'logo' + file.name.slice(file.name.lastIndexOf('.')),
                {
                  type: file.type,
                }
              );
              setLogoImage(renamed);
            }
          }}
          required
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
      </div>

      {/* Theme Image */}
      <div>
        <label className="block text-sm font-medium">Sample Theme Image:</label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              const renamed = new File(
                [file],
                'theme' + file.name.slice(file.name.lastIndexOf('.')),
                {
                  type: file.type,
                }
              );
              setThemeImage(renamed);
            }
          }}
          required
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
      </div>

      {/* Image Angle */}
      <div>
        <label className="block text-sm font-medium">Image Angle:</label>
        <select
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
          required
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        >
          <option value="" disabled>
            Image Angle:
          </option>
          <option value="Wide">Wide</option>
          <option value="Zoomed In">Zoomed In</option>
          <option value="Aerial">Aerial</option>
        </select>
      </div>

      {/* Image Size */}
      <div>
        <label className="block text-sm font-medium">Image Size:</label>
        <select
          value={imageSize}
          onChange={(e) => setImageSize(e.target.value)}
          required
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        >
          <option value="" disabled>
            Select Image Size
          </option>
          <option value="1024x1024">1024x1024</option>
          <option value="1536x1024">1536x1024</option>
          <option value="1024x1536">1024x1536</option>
          <option value="auto">Auto</option>
        </select>
      </div>

      {/* Detailed Description */}
      <div>
        <label className="block text-sm font-medium">
          Detailed Description:
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="e.g., A 4 ft × 4 ft kiosk with Fusilli and Penne pouches..."
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2"
        />
      </div>

      <button
        type="submit"
        // disabled={!isFormValid}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm disabled:opacity-50 disabled:bg-gray-400"
      >
        Generate Image
      </button>
    </form>
  );
};

export default GuidedForm;
