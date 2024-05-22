
export interface FirmwareFiles {
  data: FirmwareFilesArray[]
}

export interface FirmwareFilesArray {
  id: number;
  title: string;
  slug: string;
  image: string;
  subItemCount: number;
  files_count: number;
  order: number;
}