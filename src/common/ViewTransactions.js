import { useNavigate } from 'react-router-dom';
import CustomerNavBar from '../components/customer/CustomerNavBar';
import ManagerNavBar from '../components/manager/ManagerNavBar';
import StaffNavBar from '../components/staff/StaffNavBar';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { commonService, managerService } from '../apiUrls';
import { useState } from 'react';
import axiosPrivate from '../interceptor';

function ViewTransactions() {
    const location = useLocation();
    const account_no = location.state?.account_no;
    const navigate = useNavigate();
    const [transactiondata, setTransactionData] = useState({results:[],next:null,previous:null});
    const [pgno, setPgNo] = useState(1)
    const [present, setPresent] = useState(false);

    useEffect(() => {
      // if (account_no) {
      //   console.log('Account No:', account_no);
      // } else {
      //   console.error('Account No is undefined');
      // }

      const checkAccount = async () => {
        try {
          const response = await managerService.view_customer_transaction(account_no);
          
          setTransactionData(response.data);
          setPresent(true);
          
          if (response.data){
            console.log(response.data);
            console.log(response.data.results[0]);
          }
          // else
          //   // alert("not present");
  
        } catch (error) {
          alert(error.response.data);
        }
      };
      checkAccount();
    }, [account_no]);



  const handlePagination = async (url) => {
    try {
      const response = await axiosPrivate.post(url);
      const data = response.data;
      setTransactionData(data);
    } catch (error) {
      alert(error);
    }
}

const handleDownload = () => {
  const reponse = commonService.download_transactions_employee(account_no)
      .then(response => {
          const blob = new Blob([response.data], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'transaction_history.csv';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      })
      .catch(error => {
          console.error('Error downloading CSV:', error);
      });
};

function check(){

    if ( localStorage.getItem('usertype') == 'staff' )
        return <StaffNavBar/>;

    else if (localStorage.getItem('usertype') == 'manager')
        return <ManagerNavBar/>

}
    return (
     <>
            {check()}
            {present && (<div className="container py-5 h-100" style={{width:"60rem", alignContent:"center"}} >
        <h2 style={{textAlign:"center"}}>Transaction History</h2><br/>
        
        <table border={1} class="table table-bordered">
          <thead>
            <tr>
                <th>Transaction ID</th>
                <th>Account no</th>
                <th>Amount</th>
                <th>Transaction Type</th>
                <th>Timestamp</th>
            </tr>
            </thead>
            <tbody>
                    {transactiondata.results?.map((item) => (
                        <tr key={item.id}>
                            <td>{item.transaction_id}</td>
                            <td>{account_no}</td>
                            <td>{item.amount}</td>
                            <td>{item.type}</td>
                            <td>{item.timestamp}</td>
                            {/* Add more cells as needed */}
                        </tr>
                    ))}
                </tbody>
        </table><br/>
        {transactiondata.results!='' && (<h6 style={{textAlign:"center"}}>Page: {pgno}/{Math.ceil(transactiondata.count/5)}</h6>)}
        <button style={{marginTop: '10px'}} className="btn btn-info btn-sm mx-2" disabled={transactiondata.results==''} onClick={handleDownload}>Download</button>
        <button style={{marginTop: '10px'}} className="btn btn-info btn-sm mx-2" disabled={!transactiondata.previous} onClick={() =>{ handlePagination(transactiondata.previous); setPgNo(pgno-1)}}>Previous</button>
        <button style={{marginTop: '10px'}} className="btn btn-info btn-sm mx-2" disabled={!transactiondata.next} onClick={() => { handlePagination(transactiondata.next); setPgNo(pgno+1)}}>Next</button>

        </div>)}
        { !present && (
          <div className="container py-5 h-100" style={{ width: '70rem' }}>
        <h1 style={{textAlign:"center"}}>No Transactions!</h1>
        </div>)}
        </>
    );
  }
  
export default ViewTransactions;