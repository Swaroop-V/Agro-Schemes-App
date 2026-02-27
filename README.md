# AgroSchemesApp 🌾

AgroSchemesApp is a comprehensive web platform designed to bridge the gap between farmers and agricultural resources. It provides farmers with detailed crop information, pesticide guidelines, and a streamlined process to discover and apply for government-aided agricultural schemes.

## 🌟 Features

### For Farmers (Users) 
*   **Authentication:** Secure registration and login.
*   **Crop Information:** Browse and search through extensive crop details, including suitable seasons, locations, and recommended pesticides.
*   **Government Schemes:** Explore available financial aid and agricultural schemes.
*   **Scheme Applications:** Apply for schemes directly through the platform (prevents duplicate applications).
*   **Application Tracking:** Monitor the status of submitted applications (Pending, Approved, or Rejected).

### For Administrators
*   **Admin Dashboard:** View high-level metrics (total farmers, crops, schemes, and pending requests).
*   **Manage Crops:** Create, read, update, and delete (CRUD) crop information.
*   **Manage Schemes:** Post and manage government-aided agricultural schemes.
*   **Review Applications:** Review scheme applications submitted by farmers and update their status (Approve/Reject).

## 🛠️ Technology Stack

*   **Frontend:** React 18 (TypeScript) built with Vite
*   **Styling:** Tailwind CSS & Lucide React Icons
*   **Routing:** React Router DOM v6
*   **Backend / Database:** Google Firebase (Authentication & Cloud Firestore)
*   **Logging:** `loglevel` for structured client-side logging

## 🚀 Technical Highlights (Why this stands out)
When building this application, several engineering best practices were implemented to ensure scalability, security, and maintainability:

*   **Role-Based Access Control (RBAC):** Implemented a secure routing system using React Context and Firebase. The app dynamically resolves user roles (`admin` vs `user`) at runtime, protecting sensitive routes and UI elements.
*   **Production-Ready Logging:** Instead of relying on standard `console.log`, the app uses the `loglevel` library. This provides timestamped, level-based logging (INFO, ERROR, WARN) that can be easily toggled between development and production environments.
*   **Query Optimization & Cost Management:** To prevent the need for complex Firestore Composite Indexes and reduce database read costs, the application intelligently combines server-side filtering with client-side sorting (e.g., sorting user applications in-memory).
*   **Graceful Error Handling:** Firebase environment variables and API failures are caught gracefully, providing users and developers with actionable UI feedback (via `react-hot-toast` and custom error screens) rather than blank application crashes.
*   **NoSQL Database Design:** The Firestore database is structured with denormalization in mind, storing snapshot data (like `schemeTitle` in the applications collection) to prevent expensive SQL-like JOIN operations.

## 📂 Documentation

Detailed documentation for the project architecture and design can be found in the following files:
*   [Low-Level Design (LLD.md)](./LLD.md)
*   [System Architecture (ARCHITECTURE.md)](./ARCHITECTURE.md)
*   [UI Wireframes (WIREFRAMES.md)](./WIREFRAMES.md)

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   A Google Firebase Account

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd agro-schemes-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication** (Sign-in method: Email/Password).
3. Create a **Firestore Database** (Start in Test Mode for local development).
4. Register a "Web App" in your Firebase project settings to get your configuration keys.

### 4. Environment Variables
1. Create a `.env` file in the root directory.
2. Copy the contents of `.env.example` into your new `.env` file.
3. Replace the placeholder values with your actual Firebase configuration keys:
```env
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
```

### 5. Run the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or the port specified in your terminal).

## 👑 Setting up an Admin Account
By default, all new registrations are standard "User" (Farmer) accounts. To grant an account Admin privileges:
1. Register a new account through the app's UI.
2. Go to your Firebase Console > **Authentication** and copy the **User UID** for that account.
3. Go to **Firestore Database** and create a new collection named exactly `admins`.
4. Create a new document in the `admins` collection where the **Document ID** is the User UID you copied in step 2.
5. Log out and log back into the app. You will now be redirected to the Admin Dashboard.

## 📝 License
This project is open-source and available under the MIT License.