import { managerService } from "../apiUrls";
import ManagerNavBar from "../components/manager/ManagerNavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { validators } from "../components/Validators";

function UpdateUser() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(()=>{  
    setEmail(location.state?.email);
    setName(location.state?.name);
  },[])
  
  const handleUpdate = async () => {
      
    if(!validators.validateName(name))
    {
      alert("Name must contain alphabets only!")
      return false
    }

try{
    const data = {
        "email":email,
        "name":name,
    }
    console.log(name)
      const response = await managerService.edit_users_details(email,data);
      // console.log(response.data)
      alert(response.data);
      console.log(response.data)
      navigate("/viewusers");
  }catch(error){
      alert(error.response.data);
      // console.log(error);
  }
      }


//   function check(){

//     // if ( localStorage.getItem('usertype') == 'staff' )
//     //     return <StaffNavBar/>;

//     if (localStorage.getItem('usertype') == 'manager')
//         return <ManagerNavBar/>

// }

    return (
      <>
      {/* {check()} */}
      <ManagerNavBar/>
      <div className="container py-5 h-100" style={{width:"18rem", alignContent:"center"}} >
      <h2>Edit User Details</h2><br/>
      <form>
          <label for="email">Email:</label>
          <input type="text"  id="email" name="email" className="form-control" value={email} placeholder="Email" required readOnly/>
          
          <label for="name">Name:</label>
          <input type="name" id="name" name="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
          
          <button type="button" style={{marginTop: '10px'}} className="btn btn-primary btn-block mb-4" onClick={handleUpdate}>Update</button>

      </form>
  </div>
  </>
    );
  }
  
  export default UpdateUser;