import { axiosClient } from "../../assets/lib/axiosClient";

export const getTutorProfile = async (tutorId: string | number) => {
  const response = await axiosClient.get(`/api/tutor/${tutorId}/`);
  return response.data;
};

export const getTutorGroupClasses = async (tutorId: string | number) => {
  const response = await axiosClient.get(
    `/api/tutor/${tutorId}/group-classes/`
  );
  return response.data;
};
