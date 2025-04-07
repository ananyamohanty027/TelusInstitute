# Telus Institute AI-Driven Educational Platform

Telus Institute is a web application designed to supplement digital learning through interactive courses and automated certificate issuance. The platform offers a modern UI for exploring course content and a robust backend for managing courses and certificates.

---

## Features

- **Course Management**: Explore and interact with course materials.
- **Certificate Issuance System**: Automatically generate certificates upon course completion.
- **Interactive Learning Tools**: Access video lectures, dynamic notes, and quizzes.
- **User Authentication**: Basic login and profile management.
- **API Integration**: Connect seamlessly with external educational platforms.
- **Chat Widget**: A simple user interface for chat interactions.

---

## Tech Stack

### Web Application

- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Atlas

---

## Architecture

### Web Application

- **Frontend**:\
  Built with React.js and Vite for a fast, responsive UI.

- **Backend**:\
  An Express.js API handles certificate issuance and user management.

- **Database**:\
  MongoDB stores user data and certificate records.

### Chat Widget

- **Frontend**:\
  A React.js-based chat widget provides a simple interface for user interactions.

---

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Mohitk001/TelusInstitute.git
   cd TelusInstitute
   ```

2. **Install Dependencies**

   - **Backend:**
     ```bash
     cd backend && npm install
     ```
   - **Frontend:**
     ```bash
     cd Telus_AI && npm install
     ```

3. **Configure Environment Variables**

   - Create a `.env` file in the `backend/` directory with:
     ```
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/telusinstitute
     ```

4. **Start the Application**

   - **Backend:**
     ```bash
     cd backend && npm start
     ```
   - **Frontend:**
     ```bash
     npm start
     ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Structure

```
TelusInstitute-main/
└── TelusInstitute-main/
    ├── .gitignore
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── tailwind.config.js
    ├── .idea/                   # IDE configuration files
    ├── Telus_AI/                # React frontend project
    │   ├── package.json
    │   ├── vite.config.js
    │   ├── public/              # Frontend public assets
    │   └── src/                 # React source code
    ├── backend/                 # Node.js/Express backend
    │   ├── .env
    │   ├── server.js
    │   ├── config/              # MongoDB configuration
    │   ├── controllers/         # API logic (certificate, contact)
    │   ├── models/              # MongoDB schemas
    │   └── routes/              # Express API endpoints
    ├── build/                   # Production build output
    ├── public/                  # Shared public assets
    └── src/                     # Additional React source (if any)
```

---

## Future Enhancements

- **Implement AI-Powered Chatbot Backend**: Develop a complete solution for interactive chat support.
- **Enhanced Authentication**: Implement JWT-based security.
- **Automated Deployment**: Streamline deployment configurations.

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---

## License

This project is licensed under the [MIT License](LICENSE).

