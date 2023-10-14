import './todoApp.css';
import './LogoutComponent';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoutComponent from './LogoutComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import ListTodosComponent from './ListTodosComponent';
import WelcomeComponent from './WelcomeComponent';
import ErrorComponent from './ErrorComponent';
import LoginComponent from './LoginComponent';
import AuthProvider,{useAuth} from './security/AuthContext';
import UserListView from './UserListView';
import UpdateUser from './UpdateUser';
import CreateNewUser from './CreateNewUser';
import CreateNewProducts from './CreateNewProducts';
import OnlineShoppingPortal from './OnlineShoppingPortal';
import ViewUserCart from './ViewUserCart';

function AuthenticatedRoute({children}){
    const authContext= useAuth()
    const isAuthenticated= authContext.isAuthenticated
    
    if(isAuthenticated){
    return children
} else{
return <Navigate to="/" />
}
}

export default function TodoApp(){
    return(
        <div className='TodoApp'>
            <AuthProvider>
        <BrowserRouter>
        <HeaderComponent/>
        <Routes>
           <Route path='/' element={<LoginComponent/>}></Route>
            <Route path='/login' element={
                <AuthenticatedRoute>
            <LoginComponent/>
            </AuthenticatedRoute>
            }></Route>
            <Route path='/user' element={
                <AuthenticatedRoute>
            <UserListView/>
            </AuthenticatedRoute>
            }></Route>
            <Route path='/cart' element={
                <AuthenticatedRoute>
            <ViewUserCart/>
            </AuthenticatedRoute>
            }></Route>
            <Route path='/create' element={
            <CreateNewUser/>
            }></Route>
            <Route path='/createP' element={
            <CreateNewProducts/>
            }></Route>
            <Route path='/shopping' element={
            <OnlineShoppingPortal/>
            }></Route>
             <Route path='/update/:id' element={
                <AuthenticatedRoute>
            <UpdateUser/>
            </AuthenticatedRoute>
            }></Route>
            <Route path='/logout' element={
                <AuthenticatedRoute>
            <LogoutComponent/>
            </AuthenticatedRoute>
            }></Route>
            <Route path='/todos' element= {
                <AuthenticatedRoute>

            <ListTodosComponent/>
            </AuthenticatedRoute>
            }></Route>
              
            <Route path='/welcome/:username' element={
                <AuthenticatedRoute>
            <WelcomeComponent/>
            </AuthenticatedRoute>
            }></Route>
            <Route path='*' element={<ErrorComponent/>}></Route>
        </Routes>
       
        </BrowserRouter>
        </AuthProvider>
        </div>
    )





}