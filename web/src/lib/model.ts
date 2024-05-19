export interface JobPostingAttributes {
    id?: string,
    title: string;
    profession: string;
    date?: Date;
    location: string;
    company: string;
    source: string;
    url: string;
  }
  export interface QueryInterface {
    title: string[];
    profession: string[];
    date?: string;
    location: string[];
    company: string[];
  }
  export const DefaultQuery: QueryInterface = {
    title: [],
    profession: [],
    location: [],
    company: [],
  };
  