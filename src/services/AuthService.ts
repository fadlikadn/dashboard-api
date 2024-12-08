import { AppDataSource } from "../data-source"
import { Role } from "../entity/Role"
import { User } from "../entity/User"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

export class AuthService {
  private userRepository = AppDataSource.getRepository(User)
  private roleRepository = AppDataSource.getRepository(Role)

  public async login(username: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findOne({ where: { username }, relations: ["roles"] })
    if (user && await bcrypt.compare(password, user.password)) {
      return jwt.sign({ id: user.id, roles: user.roles.map(role => role.name) }, process.env.JWT_SECRET, { expiresIn: "1h" })
    }
    return null
  }

  public async register(username: string, name: string, email: string, password: string, roleName: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { username } })
    if (existingUser) {
      return null
    }
    console.log(roleName)

    const role = await this.roleRepository.findOne({ where: { name: roleName } })
    console.log(role)
    if (!role) {
      throw new Error("Role not found")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = this.userRepository.create({
      username,
      name,
      email,
      password: hashedPassword,
      roles: [role]
    })

    return this.userRepository.save(newUser)
  }


}