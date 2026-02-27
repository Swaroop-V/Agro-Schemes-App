# AgroWebApp - Low-Level Design (LLD) Document

## 1. Introduction
This document outlines the Low-Level Design (LLD) and solution strategies for the **AgroWebApp**, a platform designed to bridge the gap between farmers and agricultural resources. The application provides farmers with detailed crop information, pesticide guidelines, and a streamlined process to apply for government-aided agricultural schemes.

## 2. Architecture Overview
The application follows a modern Single Page Application (SPA) architecture using a Serverless Backend model.
*   **Frontend:** React 18 (TypeScript) built with Vite.
*   **Styling:** Tailwind CSS for utility-first responsive design, Lucide React for iconography.
*   **Backend/BaaS:** Google Firebase (Authentication & Firestore NoSQL Database).
*   **Routing:** React Router DOM v6.
*   **State Management:** React Context API (for global auth state) + Local Component State.

## 3. Database Schema Design (Firestore)
The application uses a NoSQL document-oriented database (Firestore). Below is the schema design for the collections:

### 3.1 `users` Collection
Stores profile information for registered farmers.
*   `id` (Document ID): Matches Firebase Auth UID
*   `name` (String): Full name of the farmer
*   `email` (String): Email address
*   `location` (String): Geographical location/region
*   `role` (String): Always `'user'`
*   `createdAt` (Timestamp/ISO String): Registration date

### 3.2 `admins` Collection
Used for Role-Based Access Control (RBAC). If a user's UID exists as a document ID in this collection, they are granted admin privileges.
*   `id` (Document ID): Matches Firebase Auth UID
*   `role` (String): `'admin'`

### 3.3 `crops` Collection
Stores detailed agricultural data managed by admins.
*   `id` (Document ID): Auto-generated
*   `name` (String): Crop name (e.g., "Wheat")
*   `season` (String): Suitable growing season (e.g., "Rabi")
*   `location` (String): Suitable soil/location
*   `pesticides` (String): Recommended pesticides and insecticides
*   `description` (String): Detailed guidelines

### 3.4 `schemes` Collection
Stores government schemes managed by admins.
*   `id` (Document ID): Auto-generated
*   `title` (String): Scheme name
*   `provider` (String): Issuing authority (e.g., "Central Govt")
*   `eligibility` (String): Criteria for farmers
*   `benefits` (String): Financial or material benefits
*   `deadline` (String): Last date to apply (ISO String)

### 3.5 `applications` Collection
Stores scheme applications submitted by farmers.
*   `id` (Document ID): Auto-generated
*   `schemeId` (String): Reference to `schemes` collection
*   `schemeTitle` (String): Snapshot of scheme title
*   `userId` (String): Reference to `users` collection
*   `userName` (String): Snapshot of farmer's name
*   `userEmail` (String): Snapshot of farmer's email
*   `status` (String): `'pending' | 'approved' | 'rejected'`
*   `appliedAt` (String): Submission timestamp (ISO String)
*   `notes` (String): Optional admin remarks

## 4. Component Design & Routing Strategy

### 4.1 Authentication & RBAC (`AuthContext.tsx`)
*   **Strategy:** A global React Context listens to Firebase `onAuthStateChanged`.
*   **Role Resolution:** Upon login, the app queries the `admins` collection using the user's UID. If a document is found, `userRole` is set to `'admin'`, otherwise `'user'`.
*   **Protected Routes:** The `<ProtectedRoute>` wrapper intercepts navigation. It checks `currentUser` and `userRole`. Unauthorized access redirects to `/login` or the appropriate dashboard.

### 4.2 Module Separation
The UI is strictly divided into two modules based on roles:

**Admin Module (`/admin/*`)**
*   `Dashboard.tsx`: Aggregates metrics (total users, crops, schemes, pending requests).
*   `ManageCrops.tsx`: CRUD operations for crops.
*   `ManageSchemes.tsx`: CRUD operations for schemes.
*   `SchemeRequests.tsx`: Table view of farmer applications with Approve/Reject actions.

**User Module (`/user/*`)**
*   `Dashboard.tsx`: Quick stats and navigation cards.
*   `Crops.tsx`: Read-only view of crops with search filtering.
*   `Schemes.tsx`: Read-only view of schemes with an "Apply" action. Prevents duplicate applications by cross-referencing the `applications` collection.
*   `MyApplications.tsx`: Tracks the status of submitted applications.

## 5. Data Fetching & Query Optimization
*   **Client-Side Sorting:** To avoid forcing the setup of complex Firestore Composite Indexes during initial deployment, queries that require both filtering (`where`) and sorting (`orderBy`) on different fields are handled via client-side sorting (e.g., in `MyApplications.tsx`, data is fetched by `userId` and then sorted by `appliedAt` in memory).
*   **Real-time vs One-time Fetches:** The app currently uses one-time fetches (`getDocs`) on component mount (`useEffect`) to reduce database read costs. State is updated locally upon successful mutations.

## 6. Logging Strategy (`src/utils/logger.ts`)
*   **Library:** `loglevel` is used instead of native `console` methods to provide a robust, production-ready logging mechanism.
*   **Environment Awareness:** Log level is set to `trace` in development and `warn` in production.
*   **Formatting:** A custom method factory overrides the default output to prepend ISO timestamps and log levels (e.g., `[2026-02-27T10:00:00.000Z] [INFO] Fetching crops...`).
*   **Traceability:** Every major action (Auth, CRUD operations, API calls) is logged for debugging and audit purposes.

## 7. Error Handling & UI Feedback
*   **Try-Catch Blocks:** All asynchronous Firebase calls are wrapped in `try-catch` blocks.
*   **Toast Notifications:** `react-hot-toast` is used to provide immediate, non-intrusive feedback to the user for both successes (e.g., "Scheme applied successfully") and failures (e.g., "Invalid credentials").
*   **Graceful Degradation:** If Firebase environment variables are missing, the app catches this in `App.tsx` and renders a helpful configuration guide rather than crashing with a blank screen.

## 8. Security Considerations
*   **Client-Side:** Routes are protected, and UI elements (like Admin buttons) are hidden from standard users.
*   **Backend (Firestore Rules):** In a production environment, Firestore rules must be configured to:
    *   Allow read access to `crops` and `schemes` for authenticated users.
    *   Restrict write access to `crops` and `schemes` to admins only.
    *   Allow users to read/write only their own documents in `users` and `applications`.
    *   Allow admins to read/write all documents in `applications`.
