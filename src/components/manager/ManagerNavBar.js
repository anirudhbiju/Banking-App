import { NavLink } from 'react-router-dom';

const ManagerNavBar = () => {
 return (
    <nav >
       <ul>
          <li>
             <NavLink to="/managerdash">Home</NavLink>
          </li>
          <li>
             <NavLink to="/managerviewusers">Accounts</NavLink>
          </li>
          <li>
             <NavLink to="/viewusers">Users</NavLink>
          </li>
          <li>
          <NavLink to="/logout">Log out</NavLink>
          </li>
       </ul>
    </nav>
 );
};

export default ManagerNavBar;