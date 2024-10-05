import { Header, Footer } from './components/index.js'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='min-h-screen'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
