import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export const NavLayout = () => {
    return (
        <>
          <Navigation />
          <Outlet /> 
          <Footer/>
        </>
      );
}
