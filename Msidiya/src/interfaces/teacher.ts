import { IUser } from "./IUser";

export interface ITutor {
  id: number;
  user: IUser;
  Cover: string | null;
  Description: string | null;
  Intro_video: string | null;
  Verification_Id: boolean;
  qualifications: any[]; // You can define a more specific type for qualifications
  languages: any[]; // You can define a more specific type for languages
}
