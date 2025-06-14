export interface GroupClass {
  id: number;
  title: string;
  description: string;
  price: number;
  main_image: string;
  tutor: number;
  category: number;
}

export type GroupClassesResponse = GroupClass[];
