import React from 'react'
import ReactDOM from 'react-dom/client'

//router
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

//pages
import HomePage from './pages/HomePage.jsx';
import AppLayout from './AppLayout.jsx';
import { ClerkProvider } from '@clerk/clerk-react'
import { Provider } from 'react-redux';


//store
import store from './store/store.js';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
 
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


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

    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
       <Provider store={store}>
          <RouterProvider router={router} />
       </Provider>
    </ClerkProvider>
  </React.StrictMode>,
)
