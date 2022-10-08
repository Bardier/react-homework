import { IGoods } from "../models";

export const getGoods = async (url: string): Promise<IGoods[]> => {
  const request = await fetch(url);
  return await request.json();
};
