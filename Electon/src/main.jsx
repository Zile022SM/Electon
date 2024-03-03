import React from 'react'
import ReactDOM from 'react-dom/client'

//router
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

//pages
import HomePage from './pages/HomePage.jsx';
import AppLayout from './AppLayout.jsx';
import { ClerkProvider,SignOutButton, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Provider } from 'react-redux';


//store
import store from './store/store.js';
import ProductDetails from './pages/ProductDetails.jsx';
import ProductCartPage from './pages/ProductCartPage.jsx';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}


const router = createBrowserRouter([
  {
    path:'/',
    element:<AppLayout />,
    children:[
      {
        path:'/',
        element: <HomePage />
      },
      {
        path:'productDetails/:id',
        element:
          <SignedIn>
              <ProductDetails />
          </SignedIn>   
      },
      {
        path:'/cartProducts',
        element: <ProductCartPage />
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
