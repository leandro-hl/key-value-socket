import mongoose, { Model } from "mongoose";
import { KeyValueDoc } from "./key-value-doc";
import { KeyValueSchema } from "./key-value-schema";
import { KeyValueDTO } from "../models/key-value-dto";

export interface IRepository {
  upsert?(keyval: KeyValueDTO);
  bulkUpsert?(keyvals: KeyValueDTO[]);
  getBy?(key: string);
}

export class Repository implements IRepository {
  private _collection: Model<KeyValueDoc>;
  private _connected: boolean;

  constructor(private _uri: string) {}

  async upsert(keyval: KeyValueDTO) {
    await this.connect();

    await this._collection.updateOne(
      { key: keyval.key },
      { value: keyval.value },
      { upsert: true }
    );
  }

  async bulkUpsert(keyvals: KeyValueDTO[]) {
    await this.connect();

    const writes = keyvals.map(x => ({
      updateOne: {
        filter: { key: x.key },
        update: { value: x.value },
        upsert: true
      }
    }));

    await this._collection.bulkWrite(writes);
  }

  async getBy(key: string) {
    await this.connect();

    return await this._collection.findOne({ key: key });
  }

  private setup() {
    this._collection = mongoose.model<KeyValueDoc>("KeyValue", KeyValueSchema);
  }

  private async connect() {
    if (!this._connected) {
      try {
        await mongoose.connect(this._uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
        });

        this._connected = true;

        this.setup();

        console.log("database connected");
      } catch (err) {
        console.error("could not connect to database", err);
      }
    }
  }
}
