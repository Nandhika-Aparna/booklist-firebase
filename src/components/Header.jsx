import { NavLink } from "react-router-dom";
import { auth} from "../firebase/config.js";
import { signOut } from "firebase/auth";
import { useDispatch} from 'react-redux';
import {setuser} from '../store/usersSlice.js';

function Header({pageTitle}) {
  const dispatch= useDispatch();

  function handlesignout(){
    if (confirm('Are you sure you want to sign out?')){
    signOut(auth).then(()=>{
      dispatch(setuser(null));

    }).catch((error)=>{
      console.log(error);
    });
  }
  }

    return (
      <>

            <h1>{pageTitle}</h1>

            <div className="header-btns">

                    <NavLink to="/">
                      <button className="btn">
                          Books
                      </button>
                    </NavLink>

                    <NavLink to="/add-book">
                      <button className="btn">
                          Add Book +
                      </button>
                    </NavLink>

                    <button onClick={handlesignout} className="btn transparent">
                      Logout
                    </button>

               
            </div>
    
      </>
    )
  }
  
  export default Header
  