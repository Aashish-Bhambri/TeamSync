# TeamSync 🚀

TeamSync is a modern, full-stack project and task management platform built for speed and simplicity. It features a clean, dark-themed dashboard, real-time task tracking, and secure user authentication.

## 🌟 Features
- **Secure Authentication**: JWT-based login and signup with BCrypt password hashing.
- **Dynamic Dashboard**: Overview of your projects, team members, and task distribution.
- **Task Management**: Create, view, and manage tasks across different projects.
- **Responsive UI**: Built with React and Chakra UI for a premium, mobile-friendly experience.
- **Vercel Optimized**: Pre-configured for seamless deployment as a monorepo.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Chakra UI, React Router, Recharts, Axios.
- **Backend**: Node.js, Express, Mongoose (MongoDB).
- **Authentication**: JSON Web Tokens (JWT) & BCrypt.
- **Deployment**: Vercel (Serverless Functions & Static Hosting).

## 🚀 Getting Started

### Prerequisites
- Node.js installed.
- A MongoDB Atlas account (for database hosting).

### Local Setup
1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd team-sync
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `server/` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=3000
   ```

4. **Run the Application**:
   - Start the Backend: `cd server && npm run dev`
   - Start the Frontend: `cd client && npm run dev`

### 🌍 Deployment on Vercel
1. Install the Vercel CLI: `npm install -g vercel`
2. Run `vercel login`.
3. From the root directory, run: `vercel --prod`
4. Add your **Environment Variables** (`MONGO_URI`, `JWT_SECRET`) in the Vercel Dashboard settings.
5. Ensure your MongoDB Atlas IP Whitelist allows `0.0.0.0/0` for Vercel access.

## 📁 Project Structure
- `/client`: Frontend React application.
- `/server`: Backend Express server and API logic.
- `/api`: Vercel-specific bridge for serverless functions.
- `vercel.json`: Deployment and routing configuration.

## 📝 License
This project is licensed under the ISC License.
