export interface Project {
  id: string;
  timestamp: number;
  name: string;
  formData: Record<string, any>;
  imageUrls: string[];
}
