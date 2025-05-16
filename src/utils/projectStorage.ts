import { Project } from '@/types/project';

export const saveProjects = (projects: Project[]) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

export const loadProjects = (): Project[] => {
  const data = localStorage.getItem('projects');
  return data ? JSON.parse(data) : [];
};

export const saveImageUrlToProject = (projectId: string, imageUrl: string) => {
  const projects = loadProjects();
  const project = projects.find((p) => p.id === projectId);
  if (project) {
    project.imageUrls.push(imageUrl);
    saveProjects(projects);
  }
};
