import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Patient } from "./Patient";

@Entity({ name: "appointments" })
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  date: string;

  @Column({ nullable: false})
  time: string;

  @Column({ nullable: false })
  doctor: string;

  @Column({ nullable: false })
  department: string;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  @JoinColumn({ name: "patient_id" })
  patient: Patient

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}