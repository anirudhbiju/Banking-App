import { NavLink } from 'react-router-dom';

const StaffNavBar = () => {
 return (
    <nav>
       <ul>
          <li>
             <NavLink to="/staffdash">Home</NavLink>
          </li>
          <li>
             <NavLink to="/staffviewusers">Accounts</NavLink>
          </li>
          <li>
             <NavLink to="/approve">Account Applications</NavLink>
          </li>
          <li>
          <NavLink to="/logout">Log out</NavLink>
          </li>
          {/* <li>
             <NavLink to="/managerupdateuser">Update</NavLink>
          </li> */}
       </ul>
    </nav>
 );
};

export default StaffNavBar;