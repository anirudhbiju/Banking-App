import { NavLink } from 'react-router-dom';

const CustomerNavBar = () => {
 return (
    <nav>
       <ul>
          <li>
             <NavLink to="/custdash">Home</NavLink>
          </li>
          <li>
             <NavLink to="/accounts">Account</NavLink>
          </li>
          <li>
             <NavLink to="/customerviewtransactions">Transaction History</NavLink>
          </li>
          <li>
             <NavLink to="/performtransactions">Perform Transactions</NavLink>
          </li>
          <li>
          <NavLink to="/logout" style={{alignContent:"end"}} >Log out</NavLink>
          </li>
       </ul>
    </nav>
 );
};

export default CustomerNavBar;