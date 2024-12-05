import { Request, Response, Router } from "express";
import { PatientController } from "../controllers/PatientController";
import { AppDataSource } from "../data-source";
import { Patient } from "../entity/Patient";

const patientRouter = Router()
const patientController = new PatientController()

patientRouter.get("/ping", async (_req, res) => {
  const response = await patientController.getMessage()
  res.json(response)
})

patientRouter.get("/", async (req: Request, res: Response) => {
  const response = await patientController.getPatiens()
  console.log(response)
  res.json(response)
})

patientRouter.get("/:id", async (req: Request, res: Response) => {
  const response = await patientController.getPatient(req.params.id)
  console.log(response)
  res.json(response)
})

patientRouter.get("/:id/diagnoses", async (req: Request, res: Response) => {
  const response = await patientController.getPatientDiagnoses(req.params.id)
  console.log(response)
  res.json(response)
})

patientRouter.get("/:id/medications", async (req: Request, res: Response) => {
  const response = await patientController.getPatientMedications(req.params.id)
  console.log(response)
  res.json(response)
})

patientRouter.get("/:id/allergies", async (req: Request, res: Response) => {
  const response = await patientController.getPatientAllergies(req.params.id)
  console.log(response)
  res.json(response)
})

patientRouter.get("/:id/appointments", async (req: Request, res: Response) => {
  const response = await patientController.getPatientAppointments(req.params.id)
  console.log(response)
  res.json(response)
})

export default patientRouter
