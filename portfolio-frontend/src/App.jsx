import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import ComingSoon from './components/ComingSoon'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path="/about" element={<ComingSoon />} />
        <Route path="/projects" element={<ComingSoon />} />
      </Routes>
    </>
  )
}

export default App
