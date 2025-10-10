import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();

    //APPEND IMAGE TO FORM DATA
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  //SET HEADER FOR FILE UPLOAD
            },
        });
        
        return response.data;

    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;    //RETHROW ERROR FOR HANDLING
    }
};

export default uploadImage;