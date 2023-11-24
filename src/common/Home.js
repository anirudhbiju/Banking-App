import NavBar from "./NavBar";

export const Home = () => {
     return(
      <>
          <NavBar/>
          <div className="container py-5 h-100" style={{width:"40rem", alignContent:"center"}} >
          <h2>Welcome To The World's Finest Bank!</h2>
        </div>
        </>);
}