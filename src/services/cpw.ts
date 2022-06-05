import { getDb } from "../gateway/mongo";
import { ObjectId } from "mongodb";
import { UserFood } from "./userFood";

export interface CaloriesPerWeight {
  // id?: ObjectId;
  // createdAt: Date;
  weight: number;
  calories: number;
  foodId: string;
}

export const getFoodCaloriesPerWeight = async () => {
  const db = await getDb();
  return db.collection<CaloriesPerWeight>("food-cpw");
};

export const calculateCaloriesFromNew = (
  weight: number,
  ISOc: number,
  ISOw: number
) => {
  const calories = (weight * ISOc) / ISOw;
  return calories;
};
