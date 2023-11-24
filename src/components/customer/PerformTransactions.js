import { useState } from "react";
import CustomerNavBar from "./CustomerNavBar";
import { useNavigate } from "react-router-dom";
import { customerService } from "../../apiUrls";
import { useEffect } from "react";
import { validators } from "../Validators";

function PerformTransactions() {
    const navigate = useNavigate()
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('deposit');
    const [accountdata, setAccountData] = useState([]);
    const [present, setPresent] = useState(false);
    const acc = []
    useEffect(() => {
      const checkAccount = async () => {
        try {
          const response = await customerService.account_view();
          
          let acc = response.data
          setAccountData(acc);
          
          if (response.data){
            setPresent(true);
          }
  
        } catch (error) {
          if (error.response.data == 'B100')
          {
            alert("You do not have an account to perform transactions! Please create one");
          }

        }
      };
      checkAccount();
  }, []);


  const handleAcc = async () => {
      navigate("/accounts");
    }

    const handleTransaction = async () => {
      if (validators.validateAmount(amount))
      {
        alert("Amount must contain only digits!")
        return false
      }

  try{
      const data = {
          "amount":parseInt(amount,10),
          "type":type
      }
        const response = await customerService.perform_transactions(data);
        console.log(response)
        alert(response.data);
        navigate("/accounts");
    }catch(error){
        alert(error.response.data);
    }
               
      
 
      }
    return (
        <>
        <CustomerNavBar />
        
        {present && ( <div className="container py-5 h-100" style={{width:"30rem", alignContent:"center"}} >
        <h1>Perform Transaction</h1><br/>
<form>
            <label for="amount">Enter amount:</label><br/>
            <input type="number" class="form-control" name="amount" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required/><br/>
            
            <label for="type">Transaction type:</label><br/>
                <select name="type" class="form-select" aria-label="Default select example" value={type} id="type" onChange={(e) => {console.log("hey",e.target.value); setType(e.target.value)}}>
                    <option value="deposit">Deposit</option>
                    <option value="withdrawal">Withdrawal</option>
                </select><br/>

                <button type="button" onClick={handleTransaction} style={{marginTop: '10px'}} className="btn btn-primary btn-block mb-4" >Submit</button>
     </form>
    </div>)}
    {!present && (<div className="container py-5 h-100" style={{width:"30rem", alignContent:"center"}} >
      <h1>Create an account to perform transactions</h1>
      <button type="button" style={{marginTop: '10px'}} onClick={handleAcc} className="btn btn-primary btn-block mb-4">Create account</button>
    </div>)}
    </>
    );
  }
  
export default PerformTransactions;