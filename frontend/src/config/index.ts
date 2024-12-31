import { getApiBaseUrl } from './env';

const config = {
    apiUrl: getApiBaseUrl() || '',
};

export { config };
