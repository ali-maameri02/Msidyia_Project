export interface GroupClass {
  id: number;
  title: string;
  grade: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
  max_book: number;
  class_type: string;
  main_image: string;
  date_created: string;
  status: string;
  last_time: string;
  tutor: number;
}

export interface CreateGroupClassData {
  title: string;
  grade: string;
  price: number;
  category: number;
  max_book: number;
  class_type: string;
  main_image: File;
  status: string;
  last_time: string;
}

export interface CreateGroupClassSessionData {
  date: string;
  duration: string;
  topic: string;
  group_class: number;
}
