import { ObjectId } from "mongodb";
import { getDb } from "../gateway/mongo";
// import { calculateCaloriesFromNew, getFoodCaloriesPerWeight } from "./cpw";

export interface Food {
  _id?: string;
  createAt: number;
  userId: string;
  foodName: string;
  isoWeight: number;
  isoUnit: string;
  isoCalories: number;
}

export const getFoodCollection = async () => {
  const db = await getDb();
  return db.collection<Food>("food");
};

// return all registered foods in the app (admin)
export const getAllFoods = async () => {
  const col = await getFoodCollection();
  return col.find().toArray();
};

export const getFoodById = async (_id: string) => {
  const col = await getFoodCollection();
  return col.find({ _id: _id }).toArray();
};

export const getAllFoodsByUser = async (userId: string) => {
  const col = await getFoodCollection();
  return col.find({ userId: userId }).toArray();
};

// User already exists.
// CREATE a new food by pressing the Create New button in the FOOD PAGE
// body will have the field userId: ObjectId; name: string; ISOWeight: number; ISOUnit: "g"; ISOCalories: number;
// ADD existing food weight and calories.
// body will have userId: ObjectId; UserFoodId: ObjectId; weight: number;

export const createFood = async (data: any) => {
  // if the food is already in the DB thrown error. Should be selected from the list
  if (!data.foodName || !data.isoWeight || !data.isoCalories) {
    return "Food fields incomplete";
  }

  // add data to UserFood Collection
  const col = await getFoodCollection();
  const { insertedId } = await col.insertOne(data);
  return insertedId;
};

// // Return the list of foods created by the user in the HOME PAGE
// export const getUserFoodByUserId = async (id: string) => {
//   const col = await getUserFoodCollection();
//   const ret = col.find({ userId: id });
//   return ret.toArray();
// };

// // Returns the ISO
// export const getISOFoodByFoodId = async (id: string) => {
//   const col = await getUserFoodCollection();
//   const ret = col.find({ id: id });
//   return ret.toArray();
// };

// return every food created by any user (admin)
// export const getUserFood = async () => {
//   const col = await getUserFoodCollection();
//   const ret = col.find({});
//   return ret.toArray();
// };

// TO USER LATER IF HAVE TIME
//
// The code commented bellow is not mandatory at this point - Phase 5
//
// export const updUserName = async (oldName, newName) => {
//     const col = await getUserFoodCollection()
//     const old = await getUserByName(oldName)
//     // update
//     const result = col.updateOne(
//         { _id: old.id },                // filter
//         { $set: { name: newName } },    // mongo set function
//     )
//     // return 1 or 0
//     return (`Total of modified documents: ${result.modifiedCount}`)
// }

// export const delUserByEmail = async (email) => {
//   const col = await getUserFoodCollection();
//   const target = await getUserByEmail(email);
//   const result = col.deleteOne(target._id);
// };

// TEST

// const email = "teste@google.com";
// const userId = await getUserByEmail(email);
// // create a user
// await createUserFood(userId, "Popcorner", 28, 140);
// // show all entries
// const foodByUser = await getUserFoodByUserId(userId);
// console.log(foodByUser);
