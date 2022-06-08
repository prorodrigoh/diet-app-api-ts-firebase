import { ObjectId } from "mongodb";
import { getDb } from "../gateway/mongo";
// import { calculateCaloriesFromNew, getFoodCaloriesPerWeight } from "./cpw";

export interface Goal {
  _id?: string;
  createdAt: number;
  userId: string;
  height: number;
  daysOfTraining: 1 | 2 | 3 | 4 | 5;
  iniWeight: number;
  iniCalories: number;
  actualWeight: number;
  actualCalories: number;
  dailyCalories: number;
  daysToWeighIn: number;
}

export const getGoalCollection = async () => {
  const db = await getDb();
  return db.collection<Goal>("goal");
};

export const createGoal = async (data: any) => {
  // if the food is already in the DB thrown error. Should be selected from the list
  if (!data.iniWeight || !data.height) {
    return "Goal fields incomplete";
  }

  // add data to UserFood Collection
  const col = await getGoalCollection();
  const { insertedId } = await col.insertOne(data);
  return insertedId;
};
