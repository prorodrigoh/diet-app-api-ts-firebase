"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFood = exports.getAllFoodsByUser = exports.getFoodById = exports.getAllFoods = exports.getFoodCollection = void 0;
const mongo_1 = require("../gateway/mongo");
const getFoodCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, mongo_1.getDb)();
    return db.collection("food");
});
exports.getFoodCollection = getFoodCollection;
// return all registered foods in the app (admin)
const getAllFoods = () => __awaiter(void 0, void 0, void 0, function* () {
    const col = yield (0, exports.getFoodCollection)();
    return col.find().toArray();
});
exports.getAllFoods = getAllFoods;
const getFoodById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const col = yield (0, exports.getFoodCollection)();
    return col.findOne({ _id: id });
});
exports.getFoodById = getFoodById;
const getAllFoodsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const col = yield (0, exports.getFoodCollection)();
    return col.find({ userId: userId }).toArray();
});
exports.getAllFoodsByUser = getAllFoodsByUser;
// User already exists.
// CREATE a new food by pressing the Create New button in the FOOD PAGE
// body will have the field userId: ObjectId; name: string; ISOWeight: number; ISOUnit: "g"; ISOCalories: number;
// ADD existing food weight and calories.
// body will have userId: ObjectId; UserFoodId: ObjectId; weight: number;
const createFood = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // if the food is already in the DB thrown error. Should be selected from the list
    if (!data.foodName || !data.isoWeight || !data.isoCalories) {
        return "Food fields incomplete";
    }
    // add data to UserFood Collection
    const col = yield (0, exports.getFoodCollection)();
    const { insertedId } = yield col.insertOne(data);
    return insertedId;
});
exports.createFood = createFood;
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
