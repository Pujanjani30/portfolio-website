import App from './App.jsx';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet, Navigate
}
  from 'react-router-dom';
import {
  Home, About, Projects, ErrorPage, Introduction, Education, Skills, Experience, Certificates,
  AdminPanel, AdminHome, AdminIntroduction, AdminEducation, AdminSkills, AdminExperience,
  AdminCertificates, AdminProjects, AdminLogs, Login, ProtectedRoute,
}
  from './components/index.js';
import UserContextProvider from './context/UserContextProvider.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>

      {/* Public Routes */}
      <Route index element={<Navigate to='home' replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />}>
        <Route index element={<Navigate to='introduction' replace />} />
        <Route path="introduction" element={<Introduction />} />
        <Route path="education" element={<Education />} />
        <Route path="skills" element={<Skills />} />
        <Route path="experience" element={<Experience />} />
        <Route path="certificates" element={<Certificates />} />
      </Route>
      <Route path="/projects" element={<Projects />} />

      <Route path="/admin/login" element={<Login />} />

      {/* Admin Routes*/}
      <Route path="/admin" element={
        <UserContextProvider>
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        </UserContextProvider>
      }>
        <Route index element={<Navigate to='home' replace />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="about" element={<Outlet />}>
          <Route path="introduction" element={<AdminIntroduction />} />
          <Route path="education" element={<AdminEducation />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="experience" element={<AdminExperience />} />
          <Route path="certificates" element={<AdminCertificates />} />
        </Route>
        <Route path="projects" element={<AdminProjects />} />
        <Route path="logs" element={<AdminLogs />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
