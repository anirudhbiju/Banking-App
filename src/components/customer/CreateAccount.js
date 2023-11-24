import CustomerNavBar from "./CustomerNavBar";
import { useNavigate } from "react-router-dom";
import { customerService } from "../../apiUrls";
import { useState } from "react";
import { useEffect } from "react";

function CreateAccounts() {
    const navigate = useNavigate()
    const [pin, setPin] = useState('');

    const handleApplication = async () => {
        
    if (pin){

  try{
      const data = {
          "pin":pin
      }
        const response = await customerService.account_creation(data);
        console.log(response)
        alert(response.data);
        navigate("/custdash");
    }catch(error){
        alert(error.response.data);
    }
            }      
      
      else{
            alert("PIN is required!")
        } 
      }

    return (
        <>

        <h2>Apply For An Account</h2><br/>
        <form>
            <label for="pin">Enter PIN for your new account:</label>
            <input type="password" name="pin" id="pin" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="PIN" maxLength={4} required/>
            
            <button type="button"className="btn btn-info btn-sm mx-2" onClick={handleApplication}>Apply</button>
        </form>
        </>
    );
  }


  function Accounts() {
    const [accountdata, setAccountData] = useState([]);
    const [present, setPresent] = useState(false);
    const acc = []
    const navigate = useNavigate()
    useEffect(() => {
      const checkAccount = async () => {
        try {
          const response = await customerService.account_view();
          
          let acc = response.data
          setAccountData(acc);
          
            setPresent(true);
  
        } catch (error) {
          setPresent(false);

        }
      };
      checkAccount();
  }, []);

  const closeAccount = async () => {
        

  try{
        const response = await customerService.close_account();
        console.log(response)
        alert(response.data);
        window.location.reload()
    }catch(error){
        // alert(response.status);
        // alert(response);
        if (error.response.data == 'B101'){
          alert("Please withdraw the balance to close the account!");
          navigate("/performtransactions");
        }
    }   
      
      }

    return (
      <>
        <CustomerNavBar />
        <div className="container py-5 h-100" style={{ width: '30rem', justifyContent: 'center', alignItems: 'center' }}>
          { present === true && (<div className="container py-5 h-100" style={{ width: '30rem', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{textAlign:"center"}}>Account details</h1>
            <table>
                <thead>
                    <tr>
                        <th>Account no</th>
                        <th>Status</th>
                        <th>Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {[accountdata].map((item) => (
                        <tr key={item.account_no}>
                            <td>{item.account_no}</td>
                            <td>{item.status}</td>
                            <td>{item.balance}</td>
                            <td><button style={{marginTop: '10px'}} className="btn btn-primary btn-block mb-4" disabled={item.status=='closed' || item.status == 'Inactive'} onClick={closeAccount}>Close</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)}
          { present === false && <CreateAccounts/>}
        </div>
      </>
    );
  }

  export default Accounts;
  