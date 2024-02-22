import React from 'react'
import ReactDOM from 'react-dom/client'

//router
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

//pages
import HomePage from './pages/HomePage.jsx';
import AppLayout from './AppLayout.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<AppLayout />,
    children:[
      {
        path:'/',
        element:<HomePage />
      }
    ],
    errorElement:<h1>Nije pronadjena strana</h1>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
