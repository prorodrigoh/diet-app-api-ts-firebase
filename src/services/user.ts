// import { ObjectId } from "mongodb";
import { getDb } from "../gateway/mongo";

export interface User {
  //id?: ObjectId;
  createAt: number;
  firstName: string;
  lastName: string;
  DOBm: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  DOBy: number;
  email: string;
}

export const getUserCollection = async () => {
  const db = await getDb();
  return db.collection<User>("user");
};

// return all registered users in the app (admin)
export const getAllUsers = async () => {
  const col = await getUserCollection();
  return col.find().toArray();
};

// // Create new user (Sign up page)
// export const createUser = async (newUser: User) => {
//   const col = await getUserCollection();
//   const { insertedId } = await col.insertOne(newUser);
//   return insertedId.toString();
// };

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
