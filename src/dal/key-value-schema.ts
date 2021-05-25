import { Schema } from "mongoose";

//Mongoose doesn't support dictionary / dynamic fields definition
const KeyValueSchema: Schema = new Schema({
  key: { type: String, required: true, unique: true },
  value: {}
});

export { KeyValueSchema };
