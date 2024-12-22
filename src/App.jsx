import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import HomePage from './components/HomePage';
import Home from './components/home/Home';
import Register from './components/authenticate/Register';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './provider/AuthProvider';
import Login from './components/authenticate/Login';
import AddFood from './components/AddFood';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/add-food', element: <AddFood /> },
    ],
  },
]);
function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;
