export interface IGroupClass {
  id: number;
  title: string;
  description: string;
  start_time: string; // ISO 8601 format: use string for datetime
  end_time: string;
  max_book: number;
  tutor_id: number;
}
