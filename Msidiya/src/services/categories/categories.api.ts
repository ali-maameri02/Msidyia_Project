import { axiosClient } from "../../assets/lib/axiosClient";

export const createCategory = async (data: any) => {
  return await axiosClient.post("/api/categories/", data);
};

export const createSubCategory = async (data: any) => {
  return await axiosClient.post("/api/subcategories/", data);
};

export const createSubSubCategory = async (data: any) => {
  return await axiosClient.post("/api/subsubcategories/", data);
};
