import { axiosClient } from "../../assets/lib/axiosClient";
import { GroupClass } from "./group_classes.types";

export const getGroupClasses = async (): Promise<GroupClass[]> => {
  const response = await axiosClient.get("/api/group-classes/");
  return response.data;
};

export const getGroupClassById = async (id: number): Promise<GroupClass> => {
  const response = await axiosClient.get(`/api/group-classes/${id}/`);
  return response.data;
};

export const createGroupClass = async (data: FormData): Promise<GroupClass> => {
  const response = await axiosClient.post("/api/group-classes/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// export const createGroupClassSession = async (
//   data: CreateGroupClassSessionData
// ): Promise<GroupClass> => {
//   const response = await axiosClient.post("/api/sessions/", data);
//   return response.data;
// };

export const deleteGroupClass = async (id: number): Promise<void> => {
  await axiosClient.delete(`/api/group-classes/${id}/`);
};
