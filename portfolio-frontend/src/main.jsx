import App from './App.jsx'
import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter, createRoutesFromElements, Route, RouterProvider
} from 'react-router-dom'
import {
  Home, About, ComingSoon, ErrorPage, Introduction, Education, Skills, Experience, Certificates,
} from './components/index.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="" element={<Home />} />
      <Route path="/about" element={<About />}>
        {/* Nested Routes */}
        <Route index element={<Introduction />} />
        <Route path="introduction" element={<Introduction />} />
        <Route path="education" element={<Education />} />
        <Route path="skills" element={<Skills />} />
        <Route path="experience" element={<Experience />} />
        <Route path="certificates" element={<Certificates />} />
      </Route>
      <Route path="/projects" element={<ComingSoon />} />
      {/* <Route path="*" element={<ErrorPage />} /> */}
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
