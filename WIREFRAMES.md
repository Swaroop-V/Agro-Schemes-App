# Wireframes & UI Layout Document - AgroWebApp

This document outlines the structural layout and wireframes for the key screens of the AgroWebApp. Since this is a text-based document, we use structural representations to define the layout of components on the screen.

---

## 1. Global Components

### 1.1 Navigation Bar (Top)
Visible on all authenticated pages. Adapts based on the user's role.

```text
+-----------------------------------------------------------------------------+
|  [Logo] AgroWebApp        [Dashboard] [Crops] [Schemes] [My Apps]   [Logout]|
+-----------------------------------------------------------------------------+
```
*   **Left:** Brand Logo and Name.
*   **Center:** Navigation Links (Dynamic based on Admin vs. Farmer role).
*   **Right:** Current User Email & Logout Button.

---

## 2. Authentication Screens

### 2.1 Login / Register Page
Centered card layout on a light gray background.

```text
+-----------------------------------------------------------------------------+
|                                                                             |
|                           +-----------------------+                         |
|                           |      [Logo]           |                         |
|                           |  Welcome to AgroWeb   |                         |
|                           |                       |                         |
|                           |  [ Email Input      ] |                         |
|                           |  [ Password Input   ] |                         |
|                           |                       |                         |
|                           |  [   Login Button   ] |                         |
|                           |                       |                         |
|                           |  Don't have account?  |                         |
|                           |  [ Register Here ]    |                         |
|                           +-----------------------+                         |
|                                                                             |
+-----------------------------------------------------------------------------+
```

---

## 3. Farmer (User) Views

### 3.1 Farmer Dashboard
A grid layout providing quick statistics and quick-access cards.

```text
+-----------------------------------------------------------------------------+
|  Welcome back, Farmer!                                                      |
|                                                                             |
|  +----------------+  +----------------+  +----------------+                 |
|  | Available      |  | Active         |  | My             |                 |
|  | Crops          |  | Schemes        |  | Applications   |                 |
|  | [ 24 ]         |  | [ 12 ]         |  | [ 3 ]          |                 |
|  +----------------+  +----------------+  +----------------+                 |
|                                                                             |
|  Quick Links:                                                               |
|  [ View Crop Guide ]    [ Browse Govt Schemes ]    [ Check App Status ]     |
+-----------------------------------------------------------------------------+
```

### 3.2 Schemes List View
A vertical list of cards detailing available schemes.

```text
+-----------------------------------------------------------------------------+
|  Government Schemes                                                         |
|                                                                             |
|  +-----------------------------------------------------------------------+  |
|  | Scheme Title: PM Kisan Yojana                                         |  |
|  | Provider: Central Govt              Deadline: 12/12/2026              |  |
|  |                                                                       |  |
|  | Eligibility: Small and marginal farmers...                            |  |
|  | Benefits: Rs. 6000 per year...                                        |  |
|  |                                                                       |  |
|  |                           [ Apply Now Button ]                        |  |
|  +-----------------------------------------------------------------------+  |
|                                                                             |
|  +-----------------------------------------------------------------------+  |
|  | Scheme Title: Organic Farming Subsidy                                 |  |
|  | ...                                                                   |  |
|  |                           [ Already Applied (Disabled) ]              |  |
|  +-----------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------+
```

---

## 4. Admin Views

### 4.1 Manage Crops / Schemes (Data Table & Form)
Split view or modal-based layout for CRUD operations.

```text
+-----------------------------------------------------------------------------+
|  Manage Crops                                        [ + Add New Crop ]     |
|                                                                             |
|  +-----------------------------------------------------------------------+  |
|  | Crop Name | Season | Location | Actions                               |  |
|  +-----------+--------+----------+---------------------------------------+  |
|  | Wheat     | Rabi   | North    | [Edit Icon] [Delete Icon]             |  |
|  | Rice      | Kharif | South    | [Edit Icon] [Delete Icon]             |  |
|  +-----------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------+
```

**Add/Edit Modal:**
```text
+-----------------------------------+
| Add New Crop                  [X] |
|                                   |
| Name:       [_______________]     |
| Season:     [_______________]     |
| Location:   [_______________]     |
| Pesticides: [_______________]     |
| Desc:       [_______________]     |
|                                   |
| [ Cancel ]         [ Save Crop ]  |
+-----------------------------------+
```

### 4.2 Scheme Requests (Admin Review)
Table layout for reviewing and updating application statuses.

```text
+-----------------------------------------------------------------------------+
|  Farmer Applications                                                        |
|                                                                             |
|  +-----------------------------------------------------------------------+  |
|  | Farmer Name | Scheme Applied | Date       | Status   | Actions        |  |
|  +-------------+----------------+------------+----------+----------------+  |
|  | John Doe    | PM Kisan       | 10/24/2026 | Pending  | [Approve][Reject]|  |
|  | Jane Smith  | Organic Sub.   | 10/23/2026 | Approved | -              |  |
|  +-----------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------+
```

---
*Note: These wireframes represent the structural intent. The actual implementation uses Tailwind CSS to render these layouts with modern styling, padding, shadows, and responsive breakpoints.*
