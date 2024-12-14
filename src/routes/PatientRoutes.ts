import { Request, Response, Router } from "express";
import { PatientController } from "../controllers/PatientController";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkPermission } from "../middlewares/rbac.middleware";

const patientRouter = Router()
const patientController = new PatientController()

patientRouter.get("/", authMiddleware, checkPermission(["DOCTOR"]), async (req: Request, res: Response) => {
  const response = await patientController.getPatiens()
  console.log(response)
  res.json(response)
})

patientRouter.get("/pagination", authMiddleware, checkPermission(["DOCTOR"]), async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1
  const pageSize = parseInt(req.query.pageSize as string) || 10
  const response = await patientController.getPatiensPagination(page, pageSize)
  console.log(response)
  res.json(response)
})

patientRouter.get("/:id", authMiddleware, checkPermission(["DOCTOR"]), async (req: Request, res: Response) => {
  const response = await patientController.getPatient(req.params.id)
  console.log(response)
  res.json(response)
})

patientRouter.get("/:id/diagnoses", authMiddleware, checkPermission(["DOCTOR"]), async (req: Request, res: Response) => {
  const response = await patientController.getPatientDiagnoses(req.params.id)
  console.log(response)
  res.json(response)
})

patientRouter.get("/:id/medications", authMiddleware, checkPermission(["DOCTOR"]), async (req: Request, res: Response) => {
  const response = await patientController.getPatientMedications(req.params.id)
  console.log(response)
  res.json(response)
})

patientRouter.get("/:id/allergies", authMiddleware, checkPermission(["DOCTOR"]), async (req: Request, res: Response) => {
  const response = await patientController.getPatientAllergies(req.params.id)
  console.log(response)
  res.json(response)
})

patientRouter.get("/:id/appointments", authMiddleware, checkPermission(["DOCTOR"]), async (req: Request, res: Response) => {
  const response = await patientController.getPatientAppointments(req.params.id)
  console.log(response)
  res.json(response)
})

patientRouter.post("/medications", authMiddleware, checkPermission(["DOCTOR"]), async (req: Request, res: Response) => {
  const response = await patientController.createMedication(req.body)
  console.log(response)
  res.json(response)
})

export default patientRouter
