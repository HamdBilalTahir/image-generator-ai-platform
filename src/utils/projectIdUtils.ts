export function generateAndSetProjectId() {
  const storedProjectId = localStorage.getItem('projectId');
  if (!storedProjectId) {
    const newProjectId = '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('projectId', newProjectId);
    return newProjectId;
  }
  return storedProjectId;
}
