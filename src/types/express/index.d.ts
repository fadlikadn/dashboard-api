import { User } from "../../entity/User";

// to make the file a module and avoid the Typescript error 
export {};

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}