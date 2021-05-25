import WebSocket from "ws";
import { Service } from "../services/service";

export class Socket {
  static configure(server) {
    const service = Service.getInstance();
    const wss = new WebSocket.Server({ server });

    wss.on("connection", ws => {
      console.log("socket connected...");

      ws.on("message", mge => service.upsert(mge));

      ws.send(`
          Welcome. 
          To store a key-value pair please follow one of the next conventions: 
          String:
            key value. Eg: "eggs 2".
          Object:
            { "key": "eggs", "value": 2 }.

          To store multiple key-values, separate them using commas.
          String:
            Eg: "eggs 2, cars blue".
          Object:
            Eg: { "tuples": [{ "key": "eggs", "value": 2 }, { "key": "cars", "value": "blue" }] }.

          If you send an existing key, this would be updated.
      `);
    });
  }
}
