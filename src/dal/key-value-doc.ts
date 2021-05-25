import { Document } from "mongoose";

export interface KeyValueDoc extends Document {
  key: string;
  value: any;
}
