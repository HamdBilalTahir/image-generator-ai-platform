import GuidedForm from '../components/GuidedForm';
import { Geist, Geist_Mono } from 'next/font/google';
import { useState } from 'react';
import Loader from '../components/Loader';
import ImageEditor from '../components/ImageEditor';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<File | null>(null);
  const [showGuidedForm, setShowGuidedForm] = useState(true);

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      {isLoading && <Loader />}
      {!isLoading && showGuidedForm && (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Generate Your Brand Copy Image
          </h1>
          <GuidedForm
            setIsLoading={setIsLoading}
            setGeneratedImage={(image) => {
              setGeneratedImage(image);
              setShowGuidedForm(false);
            }}
          />
        </>
      )}
      {!isLoading && !showGuidedForm && generatedImage && (
        <ImageEditor
          image={generatedImage}
          onEdit={(editDetails) => console.log(editDetails)}
        />
      )}
    </div>
  );
}
