export const imagePath = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_S3_IMAGE_PATH
  : process.env.REACT_APP_LOCAL_IMAGE_PATH