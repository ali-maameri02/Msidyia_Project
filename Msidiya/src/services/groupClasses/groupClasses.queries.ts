import { useQuery } from "@tanstack/react-query";
import { getGroupClasses, getGroupClass } from "./groupClasses.api";
import { GroupClass, GroupClassesResponse } from "./groupClasses.types";

export const useGroupClassesQuery = () => {
  return useQuery<GroupClassesResponse>({
    queryKey: ["groupClasses"],
    queryFn: getGroupClasses,
  });
};

export const useGroupClassQuery = (id: number) => {
  return useQuery<GroupClass>({
    queryKey: ["groupClass", id],
    queryFn: () => getGroupClass(id),
  });
};
