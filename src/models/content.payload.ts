export interface ContentPayload {
  key: string;
  content_en: any;
  content_ar: any;
  createdAt: Date;
  variables?: any[];
}
export interface UpdateContentPayload {
  $set: {
    content_en: string;
    content_ar: string;
    updatedAt: Date;
    variables?: string; // Optional field
  };
}
