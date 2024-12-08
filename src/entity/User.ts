import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm"
import { Role } from "./Role"

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true, nullable: false })
    username: string

    @Column({ nullable: false })
    @IsNotEmpty()
    name: string

    @Column({ nullable: false })
    @IsEmail()
    email: string

    @Column({ nullable: false })
    @MinLength(6)
    password: string

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}
