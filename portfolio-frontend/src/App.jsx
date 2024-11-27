import { Header, Footer } from './components/index.js'
import { Outlet, useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className='flex flex-col min-h-screen'>
      {!isAdminRoute && <Header />}
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
