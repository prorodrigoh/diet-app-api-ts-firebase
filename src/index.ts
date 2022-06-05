import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { createUser, getUserByEmail } from "./services/user";
import { createUserFood, getUserFoodByUserId } from "./services/userFood";

config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  try {
    await createUser(req.body);
    res.sendStatus(200);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "User creation not Possible",
    });
  }
});

app.get("/login", async (req, res) => {
  const userFood = await getUserByEmail(req.body);
  res.status(200).send(userFood);
});

// This will populate the FOOD PAGE with all foods from the user
// body has User ID
app.get("/food", async (req, res) => {
  const userFood = await getUserFoodByUserId(req.body);
  res.status(200).send(userFood);
});

// This will create a new food in the DB
app.post("/food", async (req, res) => {
  try {
    await createUserFood(req.body);
    res.sendStatus(200);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "User creation not Possible",
    });
  }
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
