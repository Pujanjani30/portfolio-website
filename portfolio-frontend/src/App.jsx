import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import ComingSoon from './components/ComingSoon'
import Footer from './components/Footer'
import NotFound from './components/NotFound'

function App() {
  return (
    <div className='min-h-screen'>
      <Header />
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path="/about" element={<ComingSoon />} />
        <Route path="/projects" element={<ComingSoon />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
