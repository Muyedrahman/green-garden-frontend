import axios from "axios";

export const imageUpload = async (ImageData) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const data = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData,
  );
   return data?.data?.display_url

//   const imageURL = await imageUpload(imageFile);
};


// Upload image using cloudinery
// Example post endpoint: https://api.cloudinary.com/v1_1/<cloud name>/<resource_type>/upload

export const imageUploadCloudinary = async (ImageData) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  );

  const data = await axios.post(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData,
  );
  return data?.secure_url;  

  //   const imageURL = await imageUpload(imageFile);
};

