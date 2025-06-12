import axios from "axios";

export interface Category {
  id: number;
  subjects?: { id: number; name: string; topics?: string[] }[];
  name: string;
  status: string;
}

export const fetchCategories = async (): Promise<Category | null> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/categories/`
    );

    console.log(response.data);

    return response.data ?? []; // Ensure it always returns an array
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  return null;
};
export const postCategories = async (
  name: string
): Promise<Category | null> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/categories/`,
      {
        name, // Pass the name in the request body
      }
    );

    console.log(response.data);

    return response.data; // Return the created category
  } catch (error) {
    console.error("Error posting category:", error);
  }

  return null;
};
