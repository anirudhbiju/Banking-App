import { useNavigate } from 'react-router-dom';
import StaffNavBar from './StaffNavBar';
import axiosPrivate from '../../interceptor';
import { useState } from 'react';
import { useEffect } from 'react';
import { staffService } from '../../apiUrls';

function ApproveAccount() {
    const navigate=useNavigate()
    const [accountdata, setAccountData] = useState({results:[],next:null,previous:null});
    const acc = []
    const [pgno, setPgNo] = useState(1)

    useEffect(() => {
        const checkAccount = async () => {
          try {
            const response = await staffService.pending_account_view();

            let acc = response.data
            setAccountData(acc);
            console.log(acc)
    
          } catch (error) {
              alert(error.response.data);
          }
        };
        checkAccount();
    }, []);

    const handleApproval = async (accno,status) => {
        

        try{
              const response = await staffService.account_approval(accno,status);
              console.log(response)
              alert(response.data);
              window.location.reload(true)
          }catch(error){
              alert(error.response.data);
          }   
            
            }

    const handlePagination = async (url) => {
        try {
                const response = await axiosPrivate.post(url);
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
        <h2 style={{textAlign:"center"}}>Applications</h2>
        
        <table border={1} class="table table-bordered">
            <tr>
                <th>Account no</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
            <tbody>
                    {accountdata.results?.map((item) => (
                        <tr key={item.accno}>
                            <td>{item.accno}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td><button style={{marginTop: '10px'}} className="btn btn-info btn-sm mx-2" onClick={(e) => handleApproval(item.accno,'Approve')}>Approve</button></td>
                            <td><button style={{marginTop: '10px'}} className="btn btn-info btn-sm mx-2" onClick={(e) => handleApproval(item.accno,'Reject')}>Reject</button></td>
                         
                        </tr>
                    ))}
            </tbody>
        </table><br/>
        {accountdata.results!='' && (<h6 style={{textAlign:"center"}}>Page: {pgno}/{Math.ceil(accountdata.count/5)}</h6>)}
        <button style={{marginTop: '10px'}} className="btn btn-info btn-sm mx-2" disabled={!accountdata.previous} onClick={() => { handlePagination(accountdata.previous); setPgNo(pgno -1)}}>Previous</button>
        <button style={{marginTop: '10px'}} className="btn btn-info btn-sm mx-2" disabled={!accountdata.next} onClick={() =>{ handlePagination(accountdata.next); setPgNo(pgno +1)}}>Next</button>
        </div>
        </>
    );
  }
  
export default ApproveAccount;