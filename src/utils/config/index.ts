import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  server_url: process.env.SERVER_URL,
  api_route: process.env.API_ROUTE,
  bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_SECRET,
  expires_in: process.env.JWT_EXPIRES_IN,
};
