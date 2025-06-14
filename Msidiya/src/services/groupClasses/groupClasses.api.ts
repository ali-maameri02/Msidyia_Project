import { axiosClient } from "../../assets/lib/axiosClient";
import { GroupClass, GroupClassesResponse } from "./groupClasses.types";

export const getGroupClasses = async (): Promise<GroupClassesResponse> => {
  const response = await axiosClient.get("/api/group-classes/");
  return response.data;
};

export const getGroupClass = async (id: number): Promise<GroupClass> => {
  const response = await axiosClient.get(`/api/group-classes/${id}/`);
  return response.data;
};
