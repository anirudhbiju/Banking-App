import { NavLink } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';

const NavBar = () => {
 return (
    <nav >
      <div>
       <ul>
          <li>
             <NavLink to="/">Home</NavLink>
          </li>
          <li>
             <NavLink to="/login">Login</NavLink>
          </li>
          <li>
             <NavLink to="/registration">Registration</NavLink>
          </li>
          {/* <li>
             <NavLink to="/logout">Log out</NavLink>
          </li> */}
       </ul>
       </div>
    </nav>
 );
};

export default NavBar;