import { Get, Route } from "tsoa";
import { AppDataSource } from "../data-source";
import { Patient } from "../entity/Patient";
import { Diagnose } from "../entity/Diagnose";
import { Medication } from "../entity/Medication";
import { Allergy } from "../entity/Allergy";
import { Appointment } from "../entity/Appointment";

interface PingResponse {
  message: string
}

@Route("patients")
export class PatientController {
  @Get("/ping")
  public async getMessage(): Promise<PingResponse> {
    return {
      message: "pong",
    }
  }

  @Get("/")
  public async getPatiens(): Promise<Patient[]> {
    const patients = await AppDataSource.getRepository(Patient).find()
    return patients
  }

  @Get("/:id")
  public async getPatient(id: string): Promise<Patient | null> {
    const patient = await AppDataSource.getRepository(Patient).findOneBy({ id })
    return patient
  }

  @Get("/:id/diagnoses")
  public async getPatientDiagnoses(id: string): Promise<Diagnose[] | null> {
    const diagnoses = await AppDataSource.getRepository(Diagnose).findBy({ patient: {
      id
    }})
    return diagnoses
  }

  @Get("/:id/medications")
  public async getPatientMedications(id: string): Promise<Medication[] | null> {
    const medications = await AppDataSource.getRepository(Medication).findBy({ patient: {
      id
    }})
    return medications
  }

  @Get("/:id/allergies")
  public async getPatientAllergies(id: string): Promise<Allergy[] | null> {
    const allergies = await AppDataSource.getRepository(Allergy).findBy({ patient: {
      id
    }})
    return allergies
  }

  @Get("/:id/appointments")
  public async getPatientAppointments(id: string): Promise<Appointment[] | null> {
    const appointments = await AppDataSource.getRepository(Appointment).findBy({ patient: {
      id
    }})
    return appointments
  }
}