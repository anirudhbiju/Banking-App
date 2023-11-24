import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManagerNavBar from './ManagerNavBar';
import { managerService } from '../../apiUrls';
import axiosPrivate from '../../interceptor';

function ManagerViewUsers() {
  const navigate = useNavigate();
  const [type, setType] = useState('customer');
  const [present, setPresent] = useState(false);
  const [accountdata, setAccountData] = useState({ results: [], next: null, previous: null });
  const [pgno, setPgNo] = useState(1)

  const handleView = async () => {
    try {
      const response = await managerService.view_users(type);
      const acc = response.data;
      setAccountData(acc);
      console.log(acc);
      setPresent(true);
    } catch (error) {
      // console.error(error);
      // if (error.response) {
      //   alert(error.response.data);
      // } else {
      //   alert('An error occurred while fetching user data.');
      // }
    }
  };

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
      <ManagerNavBar />
      <div className="container py-5 h-100" style={{ width: '60rem', alignContent: 'center' }}>
        <h2>Users</h2>
        <form>
          <label htmlFor="type">Usertype:</label>
          <select
            name="type"
            id="type"
            value={type}
            onChange={(e) => {
              console.log('hey', e.target.value);
              setType(e.target.value);
            }}
          >
            <option value="customer" selected>Customer</option>
            <option value="staff">Staff</option>
          </select>

          <button className="btn btn-info btn-sm mx-2" type="button" onClick={handleView}>
            View
          </button>
        </form>
        <br />
        <br />
        {present && (<div>
          <table border={1} className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {accountdata.results?.map((item) => (
                <tr key={item.email}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      style={{ marginTop: '10px' }}
                      className="btn btn-info btn-sm mx-2"
                      onClick={() => navigate('/managerupdateuser', { state: { email: item.email, name: item.name } })}>
                      <i class='far fa-edit'></i>
                      {/* Update */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {accountdata.results!='' && (<h6 style={{textAlign:"center"}}>Page: {pgno}/{Math.ceil(accountdata.count/5)}</h6>)}
          <button style={{marginTop: '10px'}} className="btn btn-info btn-sm mx-2" disabled={!accountdata.previous} onClick={() => {handlePagination(accountdata.previous); setPgNo(pgno - 1)}}>Previous</button>
          <button style={{marginTop: '10px'}} className="btn btn-info btn-sm mx-2" disabled={!accountdata.next} onClick={() => {handlePagination(accountdata.next); setPgNo(pgno + 1)}}>Next</button>
          </div>
        )}
      </div>
    </>
  );
}

export default ManagerViewUsers;
