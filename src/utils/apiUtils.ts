/* eslint-disable @typescript-eslint/no-explicit-any */
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
  for (const [key, value] of formDataObj.entries()) {
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
