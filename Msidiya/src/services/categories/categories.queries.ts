import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, getCategories } from "./categories.api";

interface CreateCategoryData {
  name: string;
  logo?: File;
  tutor: number;
}

interface Category {
  id: number;
  name: string;
  logo: string;
  status: boolean;
  tutor: number;
}

export const useGetCategories = (tutorId: number) => {
  return useQuery({
    queryKey: ["categories", tutorId],
    queryFn: async () => {
      const response = await getCategories();
      return response.data
        .filter((category: Category) => category.tutor === tutorId)
        .map((category: Category) => ({
          id: category.id,
          name: category.name,
          status: category.status,
          logo: category.logo,
        }));
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCategoryData) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("tutor", data.tutor.toString());
      if (data.logo) {
        formData.append("logo", data.logo);
      }
      return await createCategory(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
