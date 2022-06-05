// import { ObjectId } from "mongodb";
import { getDb } from "../gateway/mongo";
// import { UserFood } from "./userFood";

export interface CaloriesPerWeight {
  // id?: ObjectId;
  createdAt: number;
  weight: number;
  calories: number;
  foodId: string;
}

export const getCaloriesPerWeight = async () => {
  const db = await getDb();
  return db.collection<CaloriesPerWeight>("cpw");
};

// return all registered cpw in the app (admin)
export const getAllCPW = async () => {
  const col = await getCaloriesPerWeight();
  return col.find().toArray();
};

// export const calculateCaloriesFromNew = (
//   weight: number,
//   ISOc: number,
//   ISOw: number
// ) => {
//   const calories = (weight * ISOc) / ISOw;
//   return calories;
// };
