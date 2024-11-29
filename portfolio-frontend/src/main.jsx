import App from './App.jsx'
import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet, Navigate
}
  from 'react-router-dom'
import {
  Home, About, ComingSoon, ErrorPage, Introduction, Education, Skills, Experience, Certificates,
  AdminPanel, HomeAdmin, IntroductionAdmin, EducationAdmin, SkillsAdmin, ExperienceAdmin, CertificatesAdmin,
  ProjectsAdmin, Login, ProtectedRoute,
}
  from './components/index.js'
import UserContextProvider from './context/UserContextProvider.jsx'

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
      <Route path="/projects" element={<ComingSoon />} />

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
        <Route path="home" element={<HomeAdmin />} />
        <Route path="about" element={<Outlet />}>
          <Route path="introduction" element={<IntroductionAdmin />} />
          <Route path="education" element={<EducationAdmin />} />
          <Route path="skills" element={<SkillsAdmin />} />
          <Route path="experience" element={<ExperienceAdmin />} />
          <Route path="certificates" element={<CertificatesAdmin />} />
        </Route>
        <Route path="projects" element={<ProjectsAdmin />} />
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
