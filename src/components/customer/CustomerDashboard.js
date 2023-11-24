import CustomerNavBar from "./CustomerNavBar";
import { commonService } from "../../apiUrls";
import { useState } from "react";
import { useEffect } from "react";

function CustomerDashboard() {
  const [name, setName] = useState([])
  useEffect(() => {
    const checkAccount = async () => {
      try {
        const response = await commonService.getDash();
        
        setName(response.data);
        // console.log(response.data)

      } catch (error) {
        alert(error.response.data);

      }
    };
    checkAccount();
}, []);
    return (
        <>
        <CustomerNavBar />
      <div className="container py-5 h-100" style={{width:"30rem", alignContent:"center"}} >
      <h2>Welcome {name.name}!</h2>
      </div>
        </>
    );
  }
  
  export default CustomerDashboard;