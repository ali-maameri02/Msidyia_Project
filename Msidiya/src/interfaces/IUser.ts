export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  last_login: string | null;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;

  Role: "Student" | "Tutor" | "Ms_seller";
  Gender: "Male" | "Female" | null;
  Phone_number: string | null;
  Paypal_Email: string | null;
  Address: string | null;
  Zip_code: number | null;
  Picture: string; // This is typically a URL from the backend
}
