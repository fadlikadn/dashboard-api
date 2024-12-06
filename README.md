# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command


### **Task: Build a Patient Summary Dashboard**

---

**Objective:**  
Develop a dashboard that provides an overview of a patient's health records, enabling doctors to view recent diagnoses, current medications, allergies, and scheduled appointments in a clean, user-friendly interface.

---

### **Requirements**

#### **Frontend (React + Vite):**
1. **Patient Dashboard UI:**
   - Design a responsive React-based interface.
   - The dashboard should display:
     - **Personal Information**: Name, age, gender, contact details.
     - **Recent Diagnoses**: List of diagnoses with dates.
     - **Current Medications**: Medication name, dosage, and frequency.
     - **Allergies**: List of known allergies.
     - **Upcoming Appointments**: Date, time, and room number.
   - Include tabs or filters to toggle between summary views (e.g., medications-only, appointments-only).

2. **Real-Time Updates:**
   - Implement real-time updates for appointment data using WebSockets or polling.

3. **Design Considerations:**
   - Keep the design clean and intuitive for medical professionals.
   - Use any UI library or CSS framework (e.g., Material-UI, TailwindCSS) to enhance usability.

---

#### **Backend (Express + TypeORM):**
1. **API Endpoints:**
   - Create the following endpoints:
     - `GET /patients/:id`: Fetch patient data, including personal information.
     - `GET /patients/:id/diagnoses`: Fetch recent diagnoses for the patient.
     - `GET /patients/:id/medications`: Fetch current medications for the patient.
     - `GET /patients/:id/allergies`: Fetch known allergies for the patient.
     - `GET /patients/:id/appointments`: Fetch upcoming appointments for the patient.
   - Ensure endpoints support pagination where applicable.

2. **Database Integration:**
   - Use PostgreSQL with TypeORM for the following tables:
     - **patients**: Store personal information.
     - **diagnoses**: Store diagnosis details linked to patients.
     - **medications**: Store medication details linked to patients.
     - **allergies**: Store allergy details linked to patients.
     - **appointments**: Store appointment details linked to patients.

3. **Role-Based Access Control (RBAC):**
   - Implement RBAC to ensure only authorized users (e.g., doctors) can access sensitive patient data.

---

#### **Validation and Security:**
1. **Data Validation:**
   - Ensure all API requests validate input data (e.g., patient ID format).
2. **Authentication and Authorization:**
   - Secure API endpoints with token-based authentication (e.g., JWT).

---

### **Acceptance Criteria**

#### **Frontend:**
- The dashboard displays all required patient data in an organized layout.
- Users can filter or toggle between data views (e.g., diagnoses-only, appointments-only).
- Real-time updates for appointment data are functional.

#### **Backend:**
- API endpoints fetch and serve data accurately from the database.
- Role-based access control is implemented and functional.

#### **General:**
- All data is validated and securely transmitted.
- The application is well-documented with clear setup and usage instructions.

---

### **Deliverables**
1. **Codebase:**
   - Full project code with clear documentation on setup and usage.
   - Separate folders for the frontend and backend.
2. **API Documentation:**
   - A concise document describing the API endpoints (e.g., using Swagger or Markdown).
3. **Database Schema:**
   - ER diagram or SQL schema detailing relationships between tables.
4. **Demo:**
   - Provide instructions for running the project locally.

---

### **Bonus Challenges**
1. Add a **search bar** to find patients by name or email.
2. Implement **data visualization** for diagnoses or medication timelines.
3. Add **error handling** for network or database failures (e.g., graceful fallbacks).

---

**Submission Deadline:** [Insert Deadline]  
**Evaluation Criteria:**  
- Code quality and organization.  
- Completeness of frontend and backend features.  
- Secure and scalable implementation.  
- Attention to user experience and design.  


Reference:
https://medium.com/@christianinyekaka/building-a-rest-api-with-typescript-express-typeorm-authentication-authorization-and-postgres-e87d07d1af08

https://github.com/chrisBokotaII/typeOrm-api
https://github.com/chrisBokotaII/CarCollection


https://rsbh.dev/blogs/rest-api-with-express-typescript
https://github.com/rsbh/express-typescript