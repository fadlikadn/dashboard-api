import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Diagnose } from "./Diagnose";
import { Medication } from "./Medication";
import { Appoinment } from "./Appointment";
import { Allergy } from "./Allergy";

@Entity({ name: "patients" })
export class Patient {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  age: number;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phone: string;

  @OneToMany(() => Diagnose, (diagnose) => diagnose.patient)
  diagnoses: Diagnose[];

  @OneToMany(() => Medication, (medication) => medication.patient)
  medications: Medication[];

  @OneToMany(() => Appoinment, (appointment) => appointment.patient)
  appointments: Appoinment[];

  @OneToMany(() => Allergy, (allergy) => allergy.patient)
  allergies: Allergy[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

