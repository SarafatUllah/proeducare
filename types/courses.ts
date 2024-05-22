export interface Courses {
  data: Course[];
  meta: Meta;
}
export interface Course {
  banner_url: string;
  category_title: string;
  demoVideos: any[];
  id: number;
  is_paid: boolean;
  item_category_id: number;
  monthly_service_charge: number;
  order: number;
  price: number;
  slug: string;
  special_price: number;
  title: string;
}
export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: any[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}
