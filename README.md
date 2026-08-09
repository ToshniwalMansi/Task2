# VideoHub | RBU Video Management

A responsive video management web application built for the Technical Team recruitment task. 

The application integrates a React frontend with the provided REST API to implement authentication and video management functionality.

## Live Deployment

https://task2-m3zaqc3c5-munch-53a7.vercel.app/

## GitHub Repository

https://github.com/ToshniwalMansi/Task2

## API

**Base URL:**  
https://video-api-r1.onrender.com/api

**API Documentation:**  
https://video-api-r1.onrender.com/api-docs/

## Features

### Authentication
- User registration
- User login and logout
- Authentication token handling
- `@rbunagpur.in` email validation
- Protected dashboard

### Video Management
- Upload videos
- Fetch all videos
- Play videos directly on the website
- Edit video title and description
- Delete videos
- Publish and unpublish videos
- Display video views and status

### UI/UX
- Responsive design
- Modern dashboard
- Login and registration pages
- Video cards
- Upload form
- Edit video modal
- Loading states
- Error handling

## Tech Stack

- React
- TypeScript
- Vite
- Axios
- React Router
- CSS
- REST API
- Git & GitHub
- Vercel

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── Navbar.tsx
│   ├── VideoCard.tsx
│   └── VideoForm.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   └── Register.tsx
├── routes/
│   └── ProtectedRoute.tsx
├── services/
│   ├── api.ts
│   ├── auth.ts
│   └── video.ts
├── App.css
├── App.tsx
├── index.css
└── main.tsx
