import AppContainer from '@/components/layout/AppContainer'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import { Route, Routes } from 'react-router'

function App() {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <AppContainer>
        <Routes>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </AppContainer>
    </div>
  )
}

export default App
