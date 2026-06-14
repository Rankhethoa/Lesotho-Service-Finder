# LESOTHO SERVICE FINDER

## Overview

This is a website created to help individuals find service providers such as hairdressers in their area.
The project was made to be used in Lesotho


## Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js

### Database
- MongoDB


## Project Structure

service-finder/
│
├── frontend/
│   ├── html/
│   ├── css/
│   └── js/
│   
│
├── backend/
│   ├── middleware/
│   │   └── authenticate.js
│   │
│   ├── models/
│   └── routes/
|
├── image/
|
├── fonts/
├── server.js
├── index.html
├── .env.example
├── package.json
└── README.md


## Installation

### Prerequisites

- Node.js (v18 or later)
- MongoDB
- npm

### Step 1: Clone or Extract the Project

```bash
git clone <repository-url>
```
then cd name-of-project

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the project root and add:

```env
PORT=5001

MONGODB_URI=your_mongodb_connection_string

```

### Step 4: Start MongoDB

Ensure MongoDB is running locally or provide a MongoDB Atlas connection string.

### Step 5: Run the Application
    node server.js
    npx serve .


