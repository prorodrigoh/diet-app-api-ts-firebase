import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { closeDBConnection, createUser, getAllUsers } from "./services/user";
import {
  createFood,
  getAllFoods,
  getAllFoodsByUser,
  getFoodById,
} from "./services/food";
import { createCPW, getAllCPW } from "./services/cpw";

config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/allusers", async (req, res) => {
  const allusers = await getAllUsers();
  res.status(200).send(allusers);
  closeDBConnection();
});

app.post("/createuser", async (req, res) => {
  try {
    await createUser(req.body);
    res.sendStatus(200);
    closeDBConnection();
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "User creation is not Possible",
    });
  }
});

app.get("/allfoods", async (req, res) => {
  const allfoods = await getAllFoods();
  res.status(200).send(allfoods);
  closeDBConnection();
});

// This will create a new food in the DB
app.post("/createfood", async (req, res) => {
  try {
    await createFood(req.body);
    res.sendStatus(200);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Food creation not Possible",
    });
  }
});

//
app.get("/allfoodsbyuser", async (req, res) => {
  try {
    const allfoodsbyuser = await getAllFoodsByUser(req.body);
    res.status(200).send(allfoodsbyuser);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Problems with user " + req.body,
    });
  }
  closeDBConnection();
});

//
app.get("/foodbyid", async (req, res) => {
  try {
    const foodbyid = await getFoodById(req.body);
    res.status(200).send(foodbyid);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Problems with food " + req.body,
    });
  }
  closeDBConnection();
});
//
app.get("/allcpw", async (req, res) => {
  const allcpw = await getAllCPW();
  res.status(200).send(allcpw);
  closeDBConnection();
});

app.post("/createcpw", async (req, res) => {
  try {
    await createCPW(req.body);
    res.sendStatus(200);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "CPW creation not Possible",
    });
  }
});

// app.post("/signup", async (req, res) => {
//   try {
//     await createUser(req.body);
//     res.sendStatus(200);
//   } catch (err) {
//     // send the response a json object instead of text
//     res.status(400).send({
//       message: "User creation not Possible",
//     });
//   }
// });

// app.get("/login", async (req, res) => {
//   const userFood = await getUserByEmail(req.body);
//   res.status(200).send(userFood);
// });

// // This will populate the FOOD PAGE with all foods from the user
// // body has User ID
// app.get("/food", async (req, res) => {
//   const userFood = await getUserFoodByUserId(req.body);
//   res.status(200).send(userFood);
// });

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
