import { Api } from "./api/api";
import { Socket } from "./api/socket";
import { host, port } from "./config";

const api = Api.setup();

const server = api.listen(port, () => {
  console.log(`App listening at ${host}:${port}`);
});

Socket.configure(server);
