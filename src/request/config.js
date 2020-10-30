// 开发环境
const devBaseURL = "your development baseURL";

// 生产环境
const proBaseURL = "your production baseURL";

export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;

export const TIMEOUT = 10000;