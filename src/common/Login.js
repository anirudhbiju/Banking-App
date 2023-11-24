import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { commonService, customerService } from "../apiUrls";
import NavBar from "./NavBar";
import { validators } from "../components/Validators";
import { jwtDecode } from "jwt-decode";
import axiosPrivate from "../interceptor";

function Login() {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [accessToken, setAccessToken] = useState('');
  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50px', // Set the desired height
    margin: 'auto', // Center horizontally
    marginTop: '20px', // Add top margin for vertical centering
  };
  const navigate = useNavigate()
  const handleLogin = async () => {

      if (email && password){
      
        if (!validators.validateEmail(email))
        {
          alert("Please match email format!");
          return false
        }
        
try{
    const data = {
        "email":email,
        "password":password
    }
          const response = await commonService.login(data);
          const usertype = response.data.usertype
          // if( localStorage.getItem('access_token') )
          // {
          // const token1 = localStorage.getItem('access_token')
          // const decoded1 = jwtDecode(token1)
          // const token2 = response.data.access
          // const decoded2 = jwtDecode(token2)
          // if ( localStorage.getItem(decoded1.user_id ) ){
          // console.log(localStorage.getItem(decoded1.user_id ));
          // alert("session already active")
          // }
          // }
          // if ( JSON.stringify(decoded.user_id) in localStorage)
          // const token = response.data.access
          // const decoded = jwtDecode(token)
          // const auth = {
          //   'access':response.data.access,
          //   'refresh':response.data.refresh
          // }
          // localStorage.setItem(`${decoded.user_id}`,JSON.stringify(auth));
          localStorage.setItem('access_token',response.data.access );
          localStorage.setItem('refresh_token',response.data.refresh );
          localStorage.setItem('usertype',response.data.usertype );
          // alert(JSON.stringify(decoded.user_id))
          // alert("present")
        //   const accessTokenData = JSON.parse(JSON.stringify(response.data.access));

        //   accessToke=response.data.access;
      // if (localStorage.getItem('access_token'))
      // {
          // alert("Logged in")
          
          if (usertype == 'customer')
          {
            navigate('/custdash');
          } else if (usertype == 'staff')
          {
            navigate('/staffdash');
          } else if (usertype == 'manager')
          {
            navigate('/managerdash');
          }
      // }

  }catch(error){
      alert("Invalid credentials");
  }
      }
      else{
          alert("please provide credentials!")
      }
    }
  return (
    <>
    <NavBar/>
    <div className="container py-5 h-100" style={{width:"18rem", alignContent:"center"}} >
    <h2 style={{textAlign:"center"}}>Login</h2>
<form>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email"  className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}  required/>
        
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <div style={{textAlign:"center"}}>
        <button type="button" style={{marginTop: '20px', width:"90px", height: '40px'}} onClick={handleLogin} className="btn btn-primary btn-block mb-4">Login</button>
</div>
</form>
    </div>
</>
  );
}
export default Login;