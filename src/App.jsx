import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import HomePage from './components/HomePage';
import Home from './components/home/Home';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/register', element: <HomePage /> },
      { path: '/login', element: <HomePage /> },
      { path: '/aboutus', element: <HomePage /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
