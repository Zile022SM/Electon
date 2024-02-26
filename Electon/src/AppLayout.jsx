import { Outlet } from 'react-router-dom'
import './App.css'
import HeaderComponent from './components/HeaderComponent'
import NavBarComponent from './components/NavBarComponent'
import NavBarCategoriesComponent from './components/NavBarCategoriesComponent'
import axios from 'axios';

axios.defaults.baseURL = "https://dummyjson.com";

function AppLayout() {

  return (
    <>
    
      <div className=''>

        {/* Header info */}
        <HeaderComponent />
        {/* Navbar component */}
        <NavBarComponent /> 
        {/* Footer component */}

        {/* CAtegory */}
        <NavBarCategoriesComponent />

        <Outlet />

      </div>

    </>
  ) 
}

export default AppLayout
