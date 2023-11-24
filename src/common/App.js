// import './App.css';
import Login from './Login';
import Registration from './Registration';
import { Home } from './Home';
import {Routes, Route} from 'react-router-dom'
import CustomerDashboard from '../components/customer/CustomerDashboard';
import PerformTransactions from '../components/customer/PerformTransactions';
import ViewTransactions from './ViewTransactions';
import StaffDashboard from '../components/staff/StaffDashboard';
import StaffViewUsers from '../components/staff/StaffViewUsers';
import UpdateUser from './UpdateUser';
import ApproveAccount from '../components/staff/ApproveAccount';
import ManagerDashboard from '../components/manager/ManagerDashboard';
import ManagerViewUsers from '../components/manager/ManagerViewUsers';
import ManagerViewCustomer from '../components/manager/ManagerViewCustomer';
import LogoutButton from './Logout';
import Accounts from '../components/customer/CreateAccount';
import CustomerViewTransactions from '../components/customer/CustomerViewTransactions';


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/logout' element={<LogoutButton/>}></Route>
        <Route path='/registration' element={<Registration/>}></Route>
        <Route path='/custdash' element={<CustomerDashboard />}></Route>
        <Route path='/accounts' element={<Accounts />}></Route>
        <Route path='/performtransactions' element={<PerformTransactions/>}></Route>
        <Route path='/viewtransactions' element={<ViewTransactions />}></Route>
        <Route path='/customerviewtransactions' element={<CustomerViewTransactions/>}></Route>
        <Route path='/staffdash' element={<StaffDashboard />}></Route>
        <Route path='/staffviewusers' element={<StaffViewUsers/>}></Route>
        <Route path='/staffviewtransactions' element={<ViewTransactions/>}></Route>
        <Route path='/staffupdateuser' element={<UpdateUser/>}></Route>
        <Route path='/approve' element={<ApproveAccount/>}></Route>
        <Route path='/managerdash' element={<ManagerDashboard />}></Route>
        <Route path='/viewusers' element={<ManagerViewUsers />}></Route>
        {/* <Route path='/managerviewtransactions' element={<ViewTransactions />}></Route> */}
        <Route path='/managerupdateuser' element={<UpdateUser/>}></Route>
        <Route path='/managerviewusers' element={<ManagerViewCustomer />}></Route>
      </Routes>
    </>
  );
}

export default App;
