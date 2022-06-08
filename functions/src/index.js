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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const firebase_functions_1 = __importDefault(require("firebase-functions"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const user_1 = require("./services/user");
const food_1 = require("./services/food");
const cpw_1 = require("./services/cpw");
const mongodb_1 = require("mongodb");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.status(200).send("Welcome");
});
app.get("/allusers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allusers = yield (0, user_1.getAllUsers)();
    res.status(200).send(allusers);
    // closeDBConnection();
}));
app.post("/createuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_1.createUser)(req.body);
        res.sendStatus(200);
        // closeDBConnection();
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: "User creation is not Possible",
        });
    }
}));
app.get("/allfoods", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allfoods = yield (0, food_1.getAllFoods)();
    res.status(200).send(allfoods);
    // closeDBConnection();
}));
// This will create a new food in the DB
app.post("/createfood", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, food_1.createFood)(req.body);
        res.sendStatus(200);
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: "Food creation not Possible",
        });
    }
}));
//
app.get("/allfoodsbyuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allfoodsbyuser = yield (0, food_1.getAllFoodsByUser)(req.body);
        res.status(200).send(allfoodsbyuser);
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: "Problems with user " + req.body,
        });
    }
    // closeDBConnection();
}));
//
app.get("/foodbyid/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = new mongodb_1.ObjectId(req.params);
        const foodbyid = yield (0, food_1.getFoodById)(id);
        res.status(200).send(foodbyid);
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: "Problems with food " + req.body,
        });
    }
}));
//
app.get("/allcpw", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allcpw = yield (0, cpw_1.getAllCPW)();
    res.status(200).send(allcpw);
    // closeDBConnection();
}));
app.post("/createcpw", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, cpw_1.createCPW)(req.body);
        res.sendStatus(200);
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: "CPW creation not Possible",
        });
    }
}));
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
app.listen(5050, () => {
    console.log("Listening on http://localhost:5050");
});
exports.api = firebase_functions_1.default.https.onRequest(app);
