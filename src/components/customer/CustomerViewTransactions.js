import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { customerService } from '../../apiUrls';
import CustomerNavBar from './CustomerNavBar';
import axiosPrivate from '../../interceptor';

function CustomerViewTransactions() {
    const navigate=useNavigate()
    const [transactiondata, setTransactionData] = useState({results:[],next:null,previous:null});
    const [present, setPresent] = useState(false);
    const [pgno, setPgNo] = useState(1)
    // const [page,setPage] = useState(1)
    useEffect(() => {
      const checkAccount = async () => {
        try {
          const response = await customerService.transactions_view();
          
          setTransactionData(response.data);
          setPresent(true);
  
        } catch (error) {
          alert(error.response.data);

        }
      };
      checkAccount();
  }, []);

    const handleDownload = () => {
        const reponse = customerService.download_transactions()
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

  const handlePagination = async (url) => {
    try {
      const response = await axiosPrivate.get(url);
      const data = response.data;
      setTransactionData(data);
    } catch (error) {
      alert(error);
    }


  };


    return (
        <>
        <CustomerNavBar/>
        {present && (
        <div className="container py-5 h-100" style={{ width: '70rem' }}>
         
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
                            <td>{item.account_no}</td>
                            <td>{item.amount}</td>
                            <td>{item.type}</td>
                            <td>{item.timestamp}</td>
                            {/* Add more cells as needed */}
                        </tr>
                    ))}
                </tbody>
  
        </table><br/>
        {transactiondata.results!='' && (<h6 style={{textAlign:"center"}}>Page: {pgno}/{Math.ceil(transactiondata.count/5)}</h6>)}
        <button style={{marginTop: '10px'}} className="btn btn-info btn-sm mx-2" disabled={transactiondata.results == ''} onClick={handleDownload}>Download</button>
        <button style={{marginTop: '10px'}} className="btn btn-info btn-sm mx-2" disabled={!transactiondata.previous} onClick={() => {handlePagination(transactiondata.previous); setPgNo(pgno - 1)}}>Previous</button>
        <button style={{marginTop: '10px'}} className="btn btn-info btn-sm mx-2" disabled={!transactiondata.next} onClick={() => {handlePagination(transactiondata.next); setPgNo(pgno +1) }}>Next</button>

        </div>)}
        { !present && (
          <div className="container py-5 h-100" style={{ width: '70rem' }}>
        <h1 style={{textAlign:"center"}}>No Transactions!</h1>
        </div>)}
        </>
    );
  }
  
export default CustomerViewTransactions;