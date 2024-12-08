import { v4 as uuidv4 } from 'uuid';
import { AppDataSource } from '../data-source';
import { Patient } from '../entity/Patient';
import { Diagnose } from '../entity/Diagnose';
import { Medication } from '../entity/Medication';
import { Allergy } from '../entity/Allergy';
import { Appointment } from '../entity/Appointment';
import { Role } from '../entity/Role';
import { User } from '../entity/User';
import * as bcrypt from "bcrypt"

async function seed() {
    await AppDataSource.initialize();

    const patientRepository = AppDataSource.getRepository(Patient);
    const diagnoseRepository = AppDataSource.getRepository(Diagnose);
    const medicationRepository = AppDataSource.getRepository(Medication);
    const allergyRepository = AppDataSource.getRepository(Allergy);
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const roleRepository = AppDataSource.getRepository(Role);
    const userRepository = AppDataSource.getRepository(User);

    const patientRole = roleRepository.create({ name: 'PATIENT' });
    const doctorRole = roleRepository.create({ name: 'DOCTOR' });
    await roleRepository.save([patientRole, doctorRole]);

    const genericPassword = await bcrypt.hash('password123', 10);
    const patientUser = userRepository.create({
        username: 'patient',
        name: 'John Doe',
        email: 'fadlikadn@gmail.com',
        password: genericPassword,
        roles: [patientRole]
    })
    const doctorUser = userRepository.create({
        username: 'doctor',
        name: 'Dr. Smith',
        email: 'smith@gmail.com',
        password: genericPassword,
        roles: [doctorRole]
    })
    await userRepository.save([patientUser, doctorUser]);

    const patientId = uuidv4();
    const patient = patientRepository.create({
        id: patientId,
        name: 'Fadli',
        age: 33,
        gender: 'Male',
        email: 'fadlikadn@gmail.com',
        phone: '085729681962',
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    await patientRepository.save(patient);

    const diagnoses: Diagnose[] = [
        { id: uuidv4(), date: new Date('2024-12-05'), diagnosis: 'Influenza', createdAt: new Date(), updatedAt: new Date(), patient },
        { id: uuidv4(), date: new Date('2024-12-05'), diagnosis: 'Asam Urat', createdAt: new Date(), updatedAt: new Date(), patient },
        { id: uuidv4(), date: new Date('2024-12-05'), diagnosis: 'Batuk', createdAt: new Date(), updatedAt: new Date(), patient },
    ];

    await diagnoseRepository.save(diagnoses);

    const medications: Medication[] = [
        { id: uuidv4(), name: 'Paracetamol', dosage: '500mg', frequency: '1 per day', createdAt: new Date(), updatedAt: new Date(), patient },
        { id: uuidv4(), name: 'Ibuprofen', dosage: '200mg', frequency: '3 per day', createdAt: new Date(), updatedAt: new Date(), patient },
    ];

    await medicationRepository.save(medications);

    const allergies: Allergy[] = [
        { id: uuidv4(), allergy: 'Peanuts', createdAt: new Date(), updatedAt: new Date(), patient },
        { id: uuidv4(), allergy: 'Shellfish', createdAt: new Date(), updatedAt: new Date(), patient },
    ];

    await allergyRepository.save(allergies);

    const appointments: Appointment[] = [
        { 
            id: uuidv4(), 
            date: new Date('2024-12-10').toDateString(), 
            time: new Date('2024-12-10 08:00:00').toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            doctor: 'Dr. Smith',
            department: 'Cardiology', createdAt: new Date(), updatedAt: new Date(), patient },
        { 
            id: uuidv4(), 
            date: new Date('2024-12-15').toDateString(), 
            time: new Date('2024-12-15 10:00:00').toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            doctor: 'Dr. Johnson',
            department: 'Endocrinology', 
            createdAt: new Date(), 
            updatedAt: new Date(), patient },
    ];

    await appointmentRepository.save(appointments);
    console.log('Seeding completed!');
    process.exit(0);
}

seed().catch(error => {
    console.error('Error seeding data:', error);
    process.exit(1);
});