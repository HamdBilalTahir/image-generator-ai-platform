// export const generateImage = async (
//   projectId: string,
//   prompt: string,
//   formData: any
// ) => {
//   try {
//     console.log('🚀 ~ formData1:', formData);
//     const formDataObj = new FormData();
//     formDataObj.append('projectId', projectId);
//     formDataObj.append('prompt', prompt);
//     formData.images.forEach((image: File, index: number) => {
//       formDataObj.append(`image${index}`, image);
//     });
//     formDataObj.append('imageSize', formData.imageSize);

//     const response = await fetch('/api/generate-image', {
//       method: 'POST',
//       body: formDataObj,
//     });

//     if (!response.ok) {
//       throw new Error('Failed to generate image');
//     }

//     const data = await response.json();
//     console.log('Image generated successfully:', data);
//     return data;
//   } catch (error) {
//     console.error('Error generating image:', error);
//     throw error;
//   }
// };

export async function generateImage(
  projectId: string,
  prompt: string,
  formData: any
) {
  console.log('🚀 ~ formData:', formData);
  const formDataObj: any = new FormData();
  formDataObj.append('projectId', projectId);
  formDataObj.append('prompt', prompt);
  formDataObj.append('imageSize', formData.imageSize);

  // append every File under the same key “images”
  formData.images.forEach((file: any) =>
    formDataObj.append('images', file, file.name)
  );

  console.log('🚀 ~ formDataObj:', formDataObj);

  // …after your append calls…
  console.log('--- Client is sending ---');
  for (let [key, value] of formDataObj.entries()) {
    // File objects will show up here
    console.log(key, value);
  }

  const res = await fetch('/api/generate-image', {
    method: 'POST',
    body: formDataObj,
  });

  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}
