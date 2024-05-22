export interface JobPostingAttributes {
  id?: string;
  title: string;
  profession: string;
  date?: Date;
  location: string;
  company: string;
  source: string;
  url: string;
}

export interface ResponseInterface {
  data: JobPostingAttributes[];
  meta: {
    hasNext: boolean;
    hasPrev: boolean;
    total: number;
    totalPages: number;
  };
}
export interface QueryInterface {
  page: number;
  title: string[];
  profession: string | null;
  date?: string;
  location: string[];
  company: string[];
}
export const DefaultQuery: QueryInterface = {
  page: 1,
  profession: null,
  title: [],
  location: [],
  company: [],
};
