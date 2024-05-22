import { Links, Meta } from "./response";

export interface OnlineProvider {
  id: number;
  name: string;
  email: string;
  phone: string;
  expertise: string[];
  social_link: string[];
  avatar: string;
  created_by: number;
  updated_by: number;
}

export interface OnlineProviderResponse {
  data: OnlineProvider[];
  links: Links;
  meta: Meta;
}
