import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const host = process.env.HOST;
const db = process.env.DATABASE;

export { host, port, db };
