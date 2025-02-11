### **🚀 README.md for IRCTC Booking API (PostgreSQL + Node.js)**  
📌 Deployed Backend

Backend URL: (https://work-india-3.onrender.com) 

Api endpoints:  Postman :  https://www.postman.com/deepank01/workspace/work-india/collection/30131116-420f925f-2de6-4f75-9afc-3b7261b2d66f?action=share&creator=30131116



<!-- Steps to run at local host  -->
Step -1 
 <!-- Setup Environment Variables -->
Create a `.env` file in the project root and add:  
PORT=3000
DATABASE_URL= https://console.neon.tech/app/projects and then new project and then paste the url of the node.js in the .env

JWT_SECRET=your_secret_key

<!--  for the test purpose use 

DATABASE_URL='postgresql://neondb_owner:npg_dtziMcv3n1EX@ep-dark-thunder-a85zkts6-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
PORT=3000
JWT_SECRET=Deepank
 -->


Step -2 
## **Running the Application**  
  1) npm install
  2) npm run start


<!-- Api Endpoints  refer to the postman document  -->
<!--  for Reference : 

Postman - https://www.postman.com/deepank01/workspace/work-india/collection/30131116-420f925f-2de6-4f75-9afc-3b7261b2d66f?action=share&creator=30131116 -->

## **🔑 API Endpoints**  

### **1️⃣ User Authentication**
| Method | Endpoint | Description | Auth |
|--------|----------|------------|------|
| **POST** | `/api/auth/register` | Register a new user | ❌ No |
| **POST** | `/api/auth/login` | Login and get JWT token | ❌ No |

---

### **2️⃣ Train Management**
| Method | Endpoint | Description | Auth |
|--------|----------|------------|------|
| **POST** | `/api/trains/add` | Add a new train (Admin only) | ✅ Yes (Admin) |
| **GET** | `/api/trains/availability?source=Mumbai&destination=Delhi` | Check seat availability | ❌ No |

---

### **3️⃣ Seat Booking**
| Method | Endpoint | Description | Auth |
|--------|----------|------------|------|
| **POST** | `/api/bookings/book` | Book seats on a train | ✅ Yes (User) |
| **GET** | `/api/bookings/my-bookings` | Get user booking details | ✅ Yes (User) |


<!-- Information  -->
---
# **IRCTC Booking API**  
This project is a **Railway Ticket Booking API** that allows users to:  
✅ Register and login (JWT authentication)  
✅ View available trains between two stations  
✅ Book seats on a train (with race condition handling)  
✅ Get booking details (train name, source, destination, seats booked, and booking date)  

---

## **📌 Tech Stack**  
- **Backend:** Node.js (Express.js)  
- **Database:** PostgreSQL (Neon.tech)  

- **Authentication:** JWT  
- **Error Handling:** Middleware-based  
- **Transactions:** Used for atomic seat booking  




