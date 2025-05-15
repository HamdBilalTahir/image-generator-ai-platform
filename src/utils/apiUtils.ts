export const generateImage = async (
  projectId: string,
  prompt: string,
  formData: any
) => {
  try {
    const response = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId, prompt, formData }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const data = await response.json();
    console.log("Image generated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
