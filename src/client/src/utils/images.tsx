export const resolveImages = (images: any[], uploadedImages: any[]) => {
  const result: any[] = [];
  let index = 0;

  images.map(image => {
    if (image.url.startsWith('blob')) {
      result.push(uploadedImages[index]);
      index++;
    } else {
      result.push(image.url);
    }
  });

  return result;
};
