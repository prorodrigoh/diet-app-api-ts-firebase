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
exports.createGoal = exports.getGoalCollection = void 0;
const mongo_1 = require("../gateway/mongo");
const getGoalCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, mongo_1.getDb)();
    return db.collection("goal");
});
exports.getGoalCollection = getGoalCollection;
const createGoal = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // if the food is already in the DB thrown error. Should be selected from the list
    if (!data.iniWeight || !data.height) {
        return "Goal fields incomplete";
    }
    // add data to UserFood Collection
    const col = yield (0, exports.getGoalCollection)();
    const { insertedId } = yield col.insertOne(data);
    return insertedId;
});
exports.createGoal = createGoal;
