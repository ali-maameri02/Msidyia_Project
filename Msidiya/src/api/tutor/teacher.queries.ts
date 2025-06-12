import { useQuery } from "@tanstack/react-query";
import { getTutors } from "./teacher.api";

export const useGetTutors = () => {
  return useQuery({
    queryKey: ["tutors"],
    queryFn: getTutors,
  });
};
