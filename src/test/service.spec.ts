import { expect } from "chai";
import { spy } from "sinon";
import { IRepository } from "../dal/repository";
import { KeyValueDTO } from "../models/key-value-dto";
import { Service } from "../services/service";

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe("service", () => {
  describe("getInstance", () => {
    it("1. should return an instance.", () => {
      //Act
      const service = Service.getInstance({});

      //Asserts
      expect(service).to.be.instanceOf(Service);
    });

    it("2. should return same instance when called N times.", () => {
      //Act
      const service = Service.getInstance({});
      const service2 = Service.getInstance({});

      //Asserts
      expect(service).to.be.eq(service2);
    });
  });

  describe("upsert", () => {
    const repository: IRepository = {
      bulkUpsert(keyvals: KeyValueDTO[]) {}
    };

    const service = new Service(repository);
    const test = spy(repository, "bulkUpsert");

    it("1. should work with a key-value pair as string.", () => {
      //Arrange
      const mge = '"this is a string"';

      //Act
      service.upsert(mge);

      //Asserts
      const expected: KeyValueDTO[] = [
        {
          key: "this",
          value: "is a string"
        }
      ];

      expect(test).to.have.been.calledWith(expected);
    });

    it("2. should work with a list of key-value pairs comma separated.", () => {
      //Arrange
      const mge = '"first 1rst value, second 2nd value"';

      //Act
      service.upsert(mge);

      //Asserts
      const expected: KeyValueDTO[] = [
        {
          key: "first",
          value: "1rst value"
        },
        {
          key: "second",
          value: "2nd value"
        }
      ];

      expect(test).to.have.been.calledWith(expected);
    });

    it("3. should work with a key-value pair as object.", () => {
      //Arrange
      const mge = '{ "key": "eggs", "value": 2 }';

      //Act
      service.upsert(mge);

      //Asserts
      const expected: KeyValueDTO[] = [
        {
          key: "eggs",
          value: 2
        }
      ];

      expect(test).to.have.been.calledWith(expected);
    });

    it("4. should work with a key-value pair as array in an object.", () => {
      //Arrange
      const mge = `{ 
        "tuples": [{ "key": "eggs", "value": 2 }, { "key": "cars", "value": "blue" }] 
      }`;

      //Act
      service.upsert(mge);

      //Asserts
      const expected: KeyValueDTO[] = [
        {
          key: "eggs",
          value: 2
        },
        {
          key: "cars",
          value: "blue"
        }
      ];

      expect(test).to.have.been.calledWith(expected);
    });
  });
});
