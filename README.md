GeoSave-App

GeoSave-App is a “panic button” system for everyday use. The idea of the project is to allow a user to instantly send a distress signal with their geolocation, while an administrator receives requests marked on a map with a brief analysis of the possible situation, using OpenStreetMap data and analysis from Google Gemini.

🎯 Project Goal

Create a pet project that mimics a security system used in banks and stores, but in the pocket of every user.

👥 User Roles

Client — can send a request by pressing the “panic” button.

Administrator — sees a list of requests marked on a map, with a brief analysis of the situation.

⚙️ Functionality

Send geolocation when pressing the “panic” button.

Register new clients through a form with validation: all fields are checked and errors are displayed.

Authenticate users with validation and error handling.

Administrator authorization.

Dynamic dashboard adapting to user role (neutral, client, administrator).

Store requests and users in PostgreSQL.

JWT authentication and logout functionality.

REST API was implemented, but the project fully migrated to Next.js API routes.

🛠 Technology Stack

Backend: Node.js, Express (initially, later fully replaced by Next.js API routes).

Frontend: React (under development), with planned integration of Framer Motion for animations.

Database: PostgreSQL with two tables: users and events.

Authentication: JWT.

Validation: Registration and login data validation with user-friendly error messages.

🏗 Architecture

Implemented using Next.js App Router.

Backend and frontend are combined within Next.js and React.js using modular CSS. Future styling may include SASS.

Local PostgreSQL database stores users and requests.

🚀 Installation and Running

Clone the repository:

git clone https://github.com/Knull-bot/GeoSave-App.git
cd geosave


Install dependencies:

npm install


Create a .env file with the following variable:

SECRET=<your_JWT_secret>


The database is local, so host and password are not required for local development.

Run the project:

npm run dev


The app will be available at http://localhost:3000.

📝 Project Status

Most of the functionality is completed.

Frontend is in the code polishing stage.

Validation and error handling are already implemented.

UI and animations are planned for future updates.

🛣 Future Plans

Complete frontend styling (React.js + Framer Motion).

Optimize interaction with maps and external APIs (Google Gemini / OpenStreetMap).

Potential migration to a production server with full database configuration and .env security.
