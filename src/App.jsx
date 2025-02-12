import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import HomePage from './components/HomePage';
import Home from './components/home/Home';
import Register from './components/authenticate/Register';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './provider/AuthProvider';
import Login from './components/authenticate/Login';
import AddFood from './components/AddFood';
import PrivateRoute from './private/PrivateRoute';
import AvailableFood from './components/AvailableFood';
import FoodDetails from './components/FoodDetails';
import ManageMyFood from './components/ManageMyFood';
import MyFoodRequest from './components/MyFoodRequest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Error from './components/Error';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      {
        path: '/available-foods',
        element: <AvailableFood />,
      },
      {
        path: '/add-food',
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: '/food/:id',
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/manage-my-foods',
        element: (
          <PrivateRoute>
            <ManageMyFood />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-food-request',
        element: (
          <PrivateRoute>
            <MyFoodRequest />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
function App() {
  const queryClient = new QueryClient();
  return (
    <div className='bg-white dark:bg-gray-950'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
