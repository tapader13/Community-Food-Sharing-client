import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import HomePage from './components/HomePage';
import Home from './components/home/Home';
import Register from './components/authenticate/Register';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <HomePage /> },
      { path: '/aboutus', element: <HomePage /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
