export interface SuccessStory {
  id: number;
  name: string;
  slug: string;
}

export interface PageOverView {
  id: number;
  title: string;
  sub_title: string;
  page_slug: string;
  media_link: string;
  type: string;
  content: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
}