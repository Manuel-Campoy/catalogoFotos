import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuthStore } from './store/store'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import VendorDetailsPage from './pages/VendorDetailsPage'
import NotFound from './pages/NotFound'
import Toast from './components/Toast'

function App() {
  const hydrate = useAuthStore((state) => state.hydrate)

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Nav />
        
        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vendor/:id" element={<VendorDetailsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <Toast />
      </div>
    </Router>
  )
}

export default App