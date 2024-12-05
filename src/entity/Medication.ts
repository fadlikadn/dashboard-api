import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Patient } from "./Patient";

@Entity({ name: "medications" })
export class Medication {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  dosage: string;

  @Column({ nullable: false })
  frequency: string;

  @ManyToOne(() => Patient, (patient) => patient.medications)
  @JoinColumn({ name: "patient_id" })
  patient: Patient

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}