import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthProvider from './hooks/authProvider';
import Blog from './pages/Blog';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import PrivateRoute from './privateRoute';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/blog/bulk" element={<Blog />} />
          </Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App