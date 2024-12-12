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
import { faker } from '@faker-js/faker';

async function truncateTables() {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        await queryRunner.query(`TRUNCATE TABLE "diagnoses" CASCADE`);
        await queryRunner.query(`TRUNCATE TABLE "medications" CASCADE`);
        await queryRunner.query(`TRUNCATE TABLE "allergies" CASCADE`);
        await queryRunner.query(`TRUNCATE TABLE "appointments" CASCADE`);
        await queryRunner.query(`TRUNCATE TABLE "users_roles_role" CASCADE`);
        await queryRunner.query(`TRUNCATE TABLE "users" CASCADE`);
        await queryRunner.query(`TRUNCATE TABLE "permission" CASCADE`);
        await queryRunner.query(`TRUNCATE TABLE "role" CASCADE`);
        await queryRunner.query(`TRUNCATE TABLE "patients" CASCADE`);
        await queryRunner.commitTransaction();
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
}

async function seed() {
    await AppDataSource.initialize();

    await truncateTables()

    const patientRepository = AppDataSource.getRepository(Patient);
    const diagnoseRepository = AppDataSource.getRepository(Diagnose);
    const medicationRepository = AppDataSource.getRepository(Medication);
    const allergyRepository = AppDataSource.getRepository(Allergy);
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const roleRepository = AppDataSource.getRepository(Role);
    const userRepository = AppDataSource.getRepository(User);

    // Clean up (reset) all data
    // await diagnoseRepository.clear()
    // await medicationRepository.clear()
    // await allergyRepository.clear()
    // await appointmentRepository.clear()
    // await userRepository.clear()
    // await roleRepository.clear()
    // await patientRepository.clear()

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

    const patientAmount = 100
    for (let i = 0; i < patientAmount; i++) {

        const id = uuidv4()
        const patientData = patientRepository.create({
            id,
            name: faker.person.fullName(),
            age: faker.number.int({ min: 5, max: 50 }),
            gender: faker.person.sex(),
            email: faker.internet.email(),
            phone: faker.phone.number({ style: 'international' }),
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        await patientRepository.save(patientData)

        const diagnoses: Diagnose[] = [
            { id: uuidv4(), date: new Date('2024-12-05'), diagnosis: 'Influenza', createdAt: new Date(), updatedAt: new Date(), patient: patientData },
            { id: uuidv4(), date: new Date('2024-12-05'), diagnosis: 'Asam Urat', createdAt: new Date(), updatedAt: new Date(), patient: patientData },
            { id: uuidv4(), date: new Date('2024-12-05'), diagnosis: 'Batuk', createdAt: new Date(), updatedAt: new Date(), patient: patientData },
        ];
        await diagnoseRepository.save(diagnoses)

        const medications: Medication[] = [
            { id: uuidv4(), name: 'Paracetamol', dosage: '500mg', frequency: '1 per day', createdAt: new Date(), updatedAt: new Date(), patient: patientData },
            { id: uuidv4(), name: 'Ibuprofen', dosage: '200mg', frequency: '3 per day', createdAt: new Date(), updatedAt: new Date(), patient: patientData },
        ];
    
        await medicationRepository.save(medications);

        const allergies: Allergy[] = [
            { id: uuidv4(), allergy: 'Peanuts', createdAt: new Date(), updatedAt: new Date(), patient: patientData },
            { id: uuidv4(), allergy: 'Shellfish', createdAt: new Date(), updatedAt: new Date(), patient: patientData },
        ];
    
        await allergyRepository.save(allergies);
        
        const appointments: Appointment[] = [
            { 
                id: uuidv4(), 
                date: new Date('2024-12-10').toDateString(), 
                time: new Date('2024-12-10 08:00:00').toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                doctor: 'Dr. Smith',
                department: 'Cardiology', createdAt: new Date(), updatedAt: new Date(), patient: patientData },
            { 
                id: uuidv4(), 
                date: new Date('2024-12-15').toDateString(), 
                time: new Date('2024-12-15 10:00:00').toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                doctor: 'Dr. Johnson',
                department: 'Endocrinology', 
                createdAt: new Date(), 
                updatedAt: new Date(), patient: patientData },
        ];
    
        await appointmentRepository.save(appointments);
    }

    // const patientId = uuidv4();
    // const patient = patientRepository.create({
    //     id: patientId,
    //     name: 'Fadli',
    //     age: 33,
    //     gender: 'Male',
    //     email: 'fadlikadn@gmail.com',
    //     phone: '085729681962',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    // });
    

    // await patientRepository.save(patient);

    // const diagnoses: Diagnose[] = [
    //     { id: uuidv4(), date: new Date('2024-12-05'), diagnosis: 'Influenza', createdAt: new Date(), updatedAt: new Date(), patient },
    //     { id: uuidv4(), date: new Date('2024-12-05'), diagnosis: 'Asam Urat', createdAt: new Date(), updatedAt: new Date(), patient },
    //     { id: uuidv4(), date: new Date('2024-12-05'), diagnosis: 'Batuk', createdAt: new Date(), updatedAt: new Date(), patient },
    // ];

    // await diagnoseRepository.save(diagnoses);

    // const medications: Medication[] = [
    //     { id: uuidv4(), name: 'Paracetamol', dosage: '500mg', frequency: '1 per day', createdAt: new Date(), updatedAt: new Date(), patient },
    //     { id: uuidv4(), name: 'Ibuprofen', dosage: '200mg', frequency: '3 per day', createdAt: new Date(), updatedAt: new Date(), patient },
    // ];

    // await medicationRepository.save(medications);

    // const allergies: Allergy[] = [
    //     { id: uuidv4(), allergy: 'Peanuts', createdAt: new Date(), updatedAt: new Date(), patient },
    //     { id: uuidv4(), allergy: 'Shellfish', createdAt: new Date(), updatedAt: new Date(), patient },
    // ];

    // await allergyRepository.save(allergies);

    // const appointments: Appointment[] = [
    //     { 
    //         id: uuidv4(), 
    //         date: new Date('2024-12-10').toDateString(), 
    //         time: new Date('2024-12-10 08:00:00').toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    //         doctor: 'Dr. Smith',
    //         department: 'Cardiology', createdAt: new Date(), updatedAt: new Date(), patient },
    //     { 
    //         id: uuidv4(), 
    //         date: new Date('2024-12-15').toDateString(), 
    //         time: new Date('2024-12-15 10:00:00').toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    //         doctor: 'Dr. Johnson',
    //         department: 'Endocrinology', 
    //         createdAt: new Date(), 
    //         updatedAt: new Date(), patient },
    // ];

    // await appointmentRepository.save(appointments);
    console.log('Seeding completed!');
    process.exit(0);
}

seed().catch(error => {
    console.error('Error seeding data:', error);
    process.exit(1);
});