import React, { useState } from 'react';
import Image from 'next/image';

interface ImageEditorProps {
  image: File | null;
  onEdit: (editDetails: string) => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ image, onEdit }) => {
  const [editDetails, setEditDetails] = useState('');

  const handleEdit = () => {
    onEdit(editDetails);
  };

  const imageUrl = image ? URL.createObjectURL(image) : '';

  return (
    <div className="flex flex-col items-center">
      {image && (
        <Image
          src={imageUrl}
          alt="Generated"
          width={500}
          height={500}
          className="max-w-full h-auto"
        />
      )}
      <textarea
        value={editDetails}
        onChange={(e) => setEditDetails(e.target.value)}
        placeholder="Enter edit details here..."
        className="mt-4 w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2 resize-y"
        rows={4}
      />
      <button
        onClick={handleEdit}
        className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm"
      >
        Edit Image
      </button>
      <button
        onClick={() => {
          if (image) {
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'edited-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }}
        className="mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-sm"
      >
        Download Image
      </button>
    </div>
  );
};

export default ImageEditor;
