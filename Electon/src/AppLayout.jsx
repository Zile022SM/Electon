import { Outlet } from 'react-router-dom'
import './App.css'
import HeaderComponent from './components/HeaderComponent'
import NavBarComponent from './components/NavBarComponent'

function AppLayout() {

  return (
    <>
    
      <div className=''>

        {/* Header info */}
        <HeaderComponent />
        {/* Navbar component */}
        <NavBarComponent />
        {/* Footer component */}

        <Outlet />

      </div>

    </>
  ) 
}

export default AppLayout
