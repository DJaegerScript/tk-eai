import { QueryInterface } from './model';

export function queryBuilder(data: QueryInterface): string {
  let res = `?page=${data.page}`;
  if (data.title.length > 0) {
    data.title.forEach((str) => {
      res = `${res}&title=${str}`;
    });
  }
  if (data.profession) {
    res = `${res}&profession=${data.profession}`;
  }
  if (data.location) {
    res = `${res}&location=${data.location}`;
  }
  if (data.company) {
    res = `${res}&company=${data.company}`;
  }
  if (data.date) {
    res = `${res}&date=${data.date}`;
  }

  return res;
}
