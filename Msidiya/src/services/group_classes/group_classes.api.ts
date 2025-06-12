import { axiosClient } from "../../assets/lib/axiosClient";

export const createGroupClass = async (data: any) => {
  return await axiosClient.post("/api/group-classes/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createGroupClassSession = async (data: any) => {
  return await axiosClient.post("/api/sessions/", data);
};
