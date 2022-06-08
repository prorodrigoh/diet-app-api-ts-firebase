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
exports.createUser = exports.getAllUsers = exports.getUserCollection = exports.closeDBConnection = void 0;
// import { ObjectId } from "mongodb";
const mongo_1 = require("../gateway/mongo");
const closeDBConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, mongo_1.closeDb)();
});
exports.closeDBConnection = closeDBConnection;
const getUserCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, mongo_1.getDb)();
    return db.collection("user");
});
exports.getUserCollection = getUserCollection;
// return all registered users in the app (admin)
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const col = yield (0, exports.getUserCollection)();
    return col.find().toArray();
});
exports.getAllUsers = getAllUsers;
// Create new user (Sign up page)
const createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const col = yield (0, exports.getUserCollection)();
    const { insertedId } = yield col.insertOne(newUser);
    return insertedId.toString();
});
exports.createUser = createUser;
// // Return the user by email (Login Page)
// export const getUserByEmail = async (email: string) => {
//   const col = await getUserCollection();
//   const ret = col.find({
//     email: {
//       $regex: `.*${email}.*`,
//     },
//   });
//   return ret.toArray();
// };
// The code commented bellow is not mandatory at this point - Phase 5
//
// export const updUserName = async (oldName, newName) => {
//     const col = await getUserCollection()
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
//   const col = await getUserCollection();
//   const target = await getUserByEmail(email);
//   const result = col.deleteOne(target._id);
// };
// TEST
// // create a user
// await createUser("Rodrigo", "Henriques", "01/01/2020", "teste@google.com");
// // show all entries
// const user = await getUser();
// console.log(user);
