import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <ClipLoader size={50} color="#123abc" />
      <p className="mt-4 text-lg">Please wait while we generate the image...</p>
    </div>
  );
};

export default Loader;
