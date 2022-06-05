// import { ObjectId } from "mongodb";
import { getDb } from "../gateway/mongo";
// import { ObjectId } from "mongodb";
import { calculateCaloriesFromNew, getFoodCaloriesPerWeight } from "./cpw";

export interface UserFood {
  // id?: ObjectId;
  //createAt: Date;
  userId: string;
  name: string;
  ISOWeight: number;
  ISOUnit: "g";
  ISOCalories: number;
}

export const getUserFoodCollection = async () => {
  const db = await getDb();
  return db.collection<UserFood>("user-food");
};

// User already exists.
// CREATE a new food by pressing the Create New button in the FOOD PAGE
// body will have the field userId: ObjectId; name: string; ISOWeight: number; ISOUnit: "g"; ISOCalories: number;
// ADD existing food weight and calories.
// body will have userId: ObjectId; UserFoodId: ObjectId; weight: number;
export const createUserFood = async (data: any) => {
  // if the food is already in the DB thrown error. Should be selected from the list
  if (!data.name || !data.ISOWeight || !data.ISOCalories) {
    throw new Error("Fill all fields to create new food");
  }

  //const createdAt = new Date();
  const userId = data.userId;
  const name = data.name;
  const ISOWeight = data.ISOWeight;
  const ISOUnit = "g";
  const ISOCalories = data.ISOCalories;

  //prepData = { createdAt, userId, name, ISOWeight, ISOUnit, ISOCalories };
  const prepData = { userId, name, ISOWeight, ISOUnit, ISOCalories };

  // add data to UserFood Collection
  const col = await getUserFoodCollection();
  const insertedResults = col.insertOne(prepData);
  const insertedId = insertedResults.insertedId;

  // with the inserted ID we calculate the calories and add the values to Food CPW collection
  const weight = data.weight;
  const cal = calculateCaloriesFromNew(weight, ISOWeight, ISOCalories);

  const prepDataCal = { weight, cal, insertedId };
  const colCal = await getFoodCaloriesPerWeight();
  const { insertedIdFcpw } = colCal.insertOne(prepDataCal);

  const listOfFoods = await getUserFoodByUserId(userId);
  return listOfFoods;
};

//when user select one of the foods that already exist
export const addUserFood = async (foodId: string, foodWeight: number) => {
  // get food from list by id
  const foodData = getISOFoodByFoodId(foodId);
  // get ISO values
  const ISOWeight = foodData.ISOWeight;
  const ISOCalories = foodData.ISOCalories;
  // calculate
  const cal = calculateCaloriesFromNew(foodWeight, ISOWeight, ISOCalories);
  // save the calculated values
  const prepDataCal = { foodWeight, cal, foodId };
  const colCal = await getFoodCaloriesPerWeight();
  const { insertedIdFcpw } = colCal.insertOne(prepDataCal);
};

// Return the list of foods created by the user in the HOME PAGE
export const getUserFoodByUserId = async (id: string) => {
  const col = await getUserFoodCollection();
  const ret = col.find({ userId: id });
  return ret.toArray();
};

// Returns the ISO
export const getISOFoodByFoodId = async (id: string) => {
  const col = await getUserFoodCollection();
  const ret = col.find({ id: id });
  return ret.toArray();
};

// return every food created by any user (admin)
// export const getUserFood = async () => {
//   const col = await getUserFoodCollection();
//   const ret = col.find({});
//   return ret.toArray();
// };
console.log("Dont use code below now");
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
