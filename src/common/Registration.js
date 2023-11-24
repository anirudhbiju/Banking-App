import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { customerService } from "../apiUrls";
import { useState } from "react";
import { validators } from "../components/Validators";

function Registration() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate()
  // const [accessToken, setAccessToken] = useState('');

  const handleReg = async () => {

    if (email && name && password && confirm){
      
      if (!validators.validateEmail(email))
      {
        alert("Please match email format!");
        return false
      }
      
      if (!validators.validateName(name))
      {
        alert("Name must contain only alphabets!");
        return false    
      }

      if (password == confirm)
      {
try{
    const data = {
        "email":email,
        "password":password,
        "name":name,
        "confirm":confirm
    }


      const response = await customerService.register(data);
      // console.log(response.data)
      alert(response.data);
      navigate("/login");
  }catch(error){
      if(error.response.data.email)
        alert("An account with this email ID exists!")
  }
      }
      else 
      {
        alert("Passwords dont match!")
      }
    }
      else{
          alert("Fields cannot be empty!")
      }
    }
    return (
      <>
      <NavBar/>
      <div className="container py-5 h-100" style={{width:"18rem", alignContent:"center"}} >
      <h2 style={{textAlign:"center"}}>Registration</h2>
<form className="mx-1 mx-md-4">
          <label htmlFor="name">Name:</label>
          <input type="text"  name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required/><br/>
          
          <label htmlFor="email" >Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/><br/>
          
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/><br/>
          
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input type="password" id="confirmpassword" name="confirmpassword" value={confirm} onChange={(e) => setConfirm(e.target.value)} required/><br/>
          
          <button type="button" style={{marginTop: '10px'}} onClick={handleReg} className="btn btn-primary btn-block mb-4">Sign up</button>
  </form>
  </div>
  </>
    );
  }
  
  export default Registration;