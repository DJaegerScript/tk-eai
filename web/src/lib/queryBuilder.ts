import { QueryInterface } from "./model";

export function queryBuilder(data: QueryInterface): string {
  let res = "?";
  if (data.title.length > 0) {
    data.title.forEach((str) => {
      res = `${res}title=${str}&`;
    });
  }
  if (data.profession.length > 0) {
    data.profession.forEach((str) => {
      res = `${res}profession=${str}&`;
    });
  }
  if (data.location.length > 0) {
    data.location.forEach((str) => {
      res = `${res}location=${str}&`;
    });
  }
  if (data.company.length > 0) {
    data.company.forEach((str) => {
      res = `${res}company=${str}&`;
    });
  }
  if (data.date) {
    res = `${res}date=${data.date}&`;
  }
  res = res.substring(0, res.length - 1)
  console.log(res)
  return res;
}
