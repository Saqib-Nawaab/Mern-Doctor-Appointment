![Preview](https://res.cloudinary.com/djfem14lf/image/upload/v1751989738/Screenshot_2025-07-08_084211_wlfa8r.png)

# MERN Doctor Appointment Booking System

A full-stack web application for booking and managing doctor appointments. It's built with the MERN stack (MongoDB, Express.js, React, Node.js). The full depth details are at this https://deepwiki.com/Saqib-Nawaab/Mern-Doctor-Appointment/ . The project is organized into three main parts:

- **server/**: Node.js/Express backend API with MongoDB
- **client/**: React frontend for patients/users
- **admin/**: React frontend for admin panel

[structre](https://res.cloudinary.com/djfem14lf/image/upload/v1751989953/Screenshot_2025-07-08_084122_hil7tj.png)

---

## Features

- User authentication and registration
- Doctor and patient management
- Appointment booking, listing, and cancellation
- Admin dashboard for managing doctors, patients, and appointments
- Payment integration (Razorpay, Stripe)
- Responsive UI for both admin and client

---

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT
- **File Uploads**: Multer, Cloudinary
- **Payments**: Razorpay, Stripe

---

## Project Structure

```
root/
│
├── admin/      # Admin dashboard (React + Vite)
├── client/     # Patient/user frontend (React + Vite)
├── server/     # Backend API (Node.js + Express + MongoDB)
└── README.md   # Project documentation
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### 1. Clone the repository
```sh
git clone <repo-url>
cd "Mern Doctor Appointment"
```

### 2. Install dependencies
Install for all three parts:
```sh
cd server && npm install
cd ../client && npm install
cd ../admin && npm install
```

### 3. Environment Variables
Create a `.env` file in the `server/` directory with the following:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_SECRET_KEY=your_stripe_secret
PORT=4000
```

### 4. Run the backend server
```sh
cd server
npm run server
```

### 5. Run the client and admin frontends
In separate terminals:
```sh
cd client
npm run dev
```
```sh
cd admin
npm run dev
```

---

## Usage
- Visit the client app at `http://localhost:5173` (default Vite port)
- Visit the admin app at `http://localhost:5174` (or as configured)
- Backend API runs at `http://localhost:4000`

---

## Folder Details
- **server/**: Express routes, controllers, models, middlewares, config
- **client/**: React components, pages, context, assets for users
- **admin/**: React components, pages, context, assets for admin

---

## License
This project is licensed under the ISC License.

---

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## Contact
For questions or support, please open an issue or contact the maintainer.
