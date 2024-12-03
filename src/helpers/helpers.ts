import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config()
const { JWT_SECRET = "" } = process.env;
export class encrypt {
  static async hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }
  static async comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
  static generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
  }
  // static verifyToken(token: string): object {
  //   return jwt.verify(token, JWT_SECRET);
  // }
}