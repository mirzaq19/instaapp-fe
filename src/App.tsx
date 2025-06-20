import AppContainer from '@/components/layout/AppContainer'
import Navbar from '@/components/layout/Navbar';
import PreloadProvider from '@/components/providers/PreloadProvider';
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import NewPost from '@/pages/NewPost';
import PostDetail from '@/pages/PostDetail';
import Register from '@/pages/Register'
import PrivateRoute from '@/routes/PrivateRoute';
import PublicRoute from '@/routes/PublicRoute';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router'

function App() {
  return (
    <PreloadProvider>
      <Navbar classname='sticky top-0 z-50' />
      <div className='bg-gray-100 min-h-screen'>
        <AppContainer>
          <Routes>
            <Route index element={<Home />} />
            <Route element={<PublicRoute restricted={true} />}>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
            <Route path='posts' element={<PublicRoute restricted={false} />}>
              <Route path=':postId' element={<PostDetail />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='new-post' element={<NewPost />} />
            </Route>
          </Routes>
          <Toaster />
        </AppContainer>
      </div>
    </PreloadProvider>
  )
}

export default App
