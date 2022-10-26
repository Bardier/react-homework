import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGoods } from "../../models";

export const fetchGoods = createAsyncThunk<
  IGoods[],
  undefined,
  { rejectValue: string }
>("./goods/fetchGoods", async (_, { rejectWithValue }) => {
  const response = await fetch("./data.json");

  if (!response.ok) {
    return rejectWithValue("Что-то пошло не так...");
  }

  return (await response.json()) as IGoods[];
});
