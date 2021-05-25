import { db } from "../config";
import { IRepository, Repository } from "../dal/repository";

export class Service {
  private static _me: Service;

  private _transform = {
    object: data => {
      return data.tuples ?? [data];
    },
    string: (data: string) => {
      const tuples = data.split(",");

      return tuples.map(x => {
        const [key, ...value] = x.trim().split(" ");

        return {
          key,
          value: value.join(" ")
        };
      });
    }
  };

  constructor(private _repository: IRepository) {}

  async getBy(key: string) {
    return (await this._repository.getBy(key)).value;
  }

  upsert(mge: any) {
    const data = JSON.parse(mge);

    const keyvalues = this._transform[typeof data](data);

    this._repository.bulkUpsert(keyvalues);
  }

  static getInstance(rep?: IRepository): Service {
    if (!this._me) {
      this._me = new Service(rep ?? new Repository(db));
    }

    return this._me;
  }
}
