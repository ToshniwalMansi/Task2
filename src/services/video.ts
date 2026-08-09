import api from "./api";

export const getAllVideos = async () => {
  return await api.get("/videos");
};

export const uploadVideo = async (formData: FormData) => {
  return await api.post("/videos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteVideo = async (id: string) => {
  return await api.delete(`/videos/${id}`);
};

export const updateVideo = async (
  id: string,
  formData: FormData
) => {
  return await api.patch(`/videos/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const togglePublish = async (id: string) => {
  return await api.patch(`/videos/toggle/publish/${id}`);
};