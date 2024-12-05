import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Patient } from "./Patient";

@Entity({ name: "allergies" })
export class Allergy {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ nullable: false })
  allergy: string

  @ManyToOne(() => Patient, (patient) => patient.allergies)
  @JoinColumn({ name: "patient_id" })
  patient: Patient

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}