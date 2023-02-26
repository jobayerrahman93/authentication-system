import dotenv from "dotenv";
import path from "path";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  DB_NAME: string | undefined;
  DB_PASS: string | undefined;
  DB_USER: string | undefined;
  DB_PORT: string | undefined;
  DB_HOST: string | undefined;
  PORT: number | undefined;
}

interface Config {
  DB_NAME: string;
  DB_PASS: string;
  DB_USER: string;
  DB_PORT: string;
  DB_HOST: string;
  PORT: number;
  JWT_SECRET_USER: string;
}

// Loading process.env as  ENV interface
const getConfig = (): ENV => {
  return {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as Config;
};

const configuration = getConfig();

const config = getSanitzedConfig(configuration);

export default config;
