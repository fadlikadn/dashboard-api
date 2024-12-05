import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Patient } from "./Patient";

@Entity({ name: "diagnoses" })
export class Diagnose {
  @PrimaryGeneratedColumn("uuid")
  id: string
  
  @Column({ nullable: false })
  date: Date

  @Column({ nullable: false })
  diagnosis: string

  @ManyToOne(() => Patient, (patient) => patient.diagnoses)
  @JoinColumn({ name: "patient_id" })
  patient: Patient

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}