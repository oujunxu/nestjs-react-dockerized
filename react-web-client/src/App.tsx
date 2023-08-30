import './App.css';
import { Home } from './components/home/Home';
import { Login } from './components/account/Login';
import {Routes, Route} from 'react-router-dom';
import { NavLayout } from './components/base/NavLayout';
import { Register } from './components/account/Register';
import { RouteGuard } from './components/routes/RouteGuard';
import { About } from './components/about/About';
import { LoginGuard } from './components/routes/LoginGuard';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import { AdminGuard } from './components/routes/AdminGuard';
import { User } from './components/admin/components/User';
import { UserEdit } from './components/admin/components/UserEdit';

const queryClient = new QueryClient();

function App() {
  return (
  <div className='app'>
    <QueryClientProvider client={queryClient}>
        <Routes>
        <Route path="/" element={<RouteGuard children={<NavLayout/>}/>}>
          <Route path='/' element={<RouteGuard children={<Home/>}/>}></Route>
          <Route path='/home' element={<RouteGuard children={<Home/>}/>}></Route>
          <Route path='/about' element={<RouteGuard><About/></RouteGuard>}></Route>
          <Route path='/admin/user' element={<AdminGuard><User/></AdminGuard>}></Route>
          <Route path='/admin/user/:id' element={<AdminGuard><UserEdit/></AdminGuard>}></Route>
        </Route>
        <Route path='/register' element={<LoginGuard><Register/></LoginGuard>}></Route>
        <Route path='/login' element={<LoginGuard><Login/></LoginGuard>}></Route>
      </Routes>
    </QueryClientProvider>
    </div>
  );
}

export default App;
