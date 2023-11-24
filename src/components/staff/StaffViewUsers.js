import { useNavigate } from 'react-router-dom';
import StaffNavBar from './StaffNavBar';
import axiosPrivate from '../../interceptor';
import { useState } from 'react';
import { useEffect } from 'react';
import { staffService } from '../../apiUrls';

function StaffViewUsers() {
    const navigate = useNavigate();
    const [accountdata, setAccountData] = useState({results:[],next:null,previous:null});
    const acc = []
    const [pgno,setPgNo] = useState(1)

    useEffect(() => {
      const checkAccount = async () => {
        try {
          const response = await staffService.staff_view_users();
          
          let acc = response.data
          setAccountData(acc);
          console.log(acc)
  
        } catch (error) {
            // alert(error.response.data);
        }
      };
      checkAccount();
  }, []);

  const handlePagination = async (url) => {
    try {
      const response = await axiosPrivate.get(url);
      const data = response.data;
      setAccountData(data);
    } catch (error) {
      alert(error);
    }
}
    return (
        <>
        <StaffNavBar/>
        <div className="container py-5 h-100" style={{ width: '60rem', alignContent: 'center' }}>
        <h2 style={{textAlign:"center"}}>Accounts</h2>
        <table border={1} class="table table-bordered">
        <thead class="thead-dark">
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Account number</th>
                <th>Balance</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
              {accountdata.results?.map((item) => (
                <tr key={item.email}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.accno}</td>
                  <td>{item.balance}</td>
                  <td>
                    <button
                      style={{ marginTop: '10px' }}
                      className="btn btn-info btn-sm mx-2"
                      onClick={() => navigate('/viewTransactions',{ state: { account_no: item.accno } })}>
                      Transaction History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
  
        </table>
          {accountdata.results!='' && (<h6 style={{textAlign:"center"}}>Page: {pgno}/{Math.ceil(accountdata.count/5)}</h6>)}
          <button style={{marginTop: '10px'}} className="btn btn-info btn-sm mx-2" disabled={!accountdata.previous} onClick={() => {handlePagination(accountdata.previous); setPgNo(pgno -1)}}>Previous</button>
          <button style={{marginTop: '10px'}} className="btn btn-info btn-sm mx-2" disabled={!accountdata.next} onClick={() => {handlePagination(accountdata.next); setPgNo(pgno +1)}}>Next</button>
    </div>
    </>
    );
  }
  
export default StaffViewUsers;