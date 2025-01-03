declare global {
  interface Window {
    env?: {
      VITE_API_BASE_URL?: string;
    };
  }
}

export const getApiBaseUrl = (): string | undefined => {
  if (typeof window !== 'undefined' && window.env?.VITE_API_BASE_URL) {
    return window.env.VITE_API_BASE_URL;
  }
  
  try {
    // @ts-ignore - Vite's import.meta.env is properly typed in vite-env.d.ts
    return import.meta.env.VITE_API_BASE_URL;
  } catch {
    // Ignore error in test environment
  }
  
  return undefined;
};
