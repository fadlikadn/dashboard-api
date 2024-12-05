import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false })
    @IsNotEmpty()
    name: string

    @Column({ nullable: false })
    @IsEmail()
    email: string

    @Column({ nullable: false })
    @MinLength(6)
    password: string

    @Column({ nullable: false })
    role: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}
