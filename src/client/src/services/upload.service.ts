import apiAxios from '@/lib/api';

const uploadFiles = (files: any, path?: string) => {
  const formData = new FormData();
  files.map(file => formData.append('files', file));

  return apiAxios.post(path ?? '/products/upload', formData, {
    withCredentials: true,
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const uploadService = {
  uploadFiles,
};
