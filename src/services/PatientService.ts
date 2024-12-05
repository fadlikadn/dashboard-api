import { AppDataSource } from "../data-source";
import { Appointment } from "../entity/Appointment";
import { Diagnose } from "../entity/Diagnose";
import { Medication } from "../entity/Medication";
import { Patient } from "../entity/Patient";

export class PatientService {
  private patientRepository = AppDataSource.getRepository(Patient)
  private appointmentRepository = AppDataSource.getRepository(Appointment)
  private diagnoseRepository = AppDataSource.getRepository(Diagnose)
  private medicationRepository = AppDataSource.getRepository(Medication)

  async getPatientById(id: string): Promise<Patient | null> {
    return this.patientRepository.findOne({
      where: { id },
      relations: ["appointments", "diagnoses", "medications"],
    })
  }
}