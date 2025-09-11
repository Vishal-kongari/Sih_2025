export type AppRole = 'student' | 'counselor' | 'on-campus-counselor';

const ROLE_KEY = 'app.role';
const NAME_KEY = 'app.name';

export const setRole = (role: AppRole) => {
  localStorage.setItem(ROLE_KEY, role);
};

export const getRole = (): AppRole | null => {
  const v = localStorage.getItem(ROLE_KEY);
  return v as AppRole | null;
};

export const setName = (name: string) => localStorage.setItem(NAME_KEY, name);
export const getName = () => localStorage.getItem(NAME_KEY) || 'User';
export const clearAuth = () => {
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(NAME_KEY);
};


