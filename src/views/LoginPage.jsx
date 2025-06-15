import FullPageLoader from '../components/FullPageLoader.jsx';
import {useState} from 'react';
import {auth} from '../firebase/config.js'
import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useDispatch} from 'react-redux';
import {setuser} from '../store/usersSlice.js';

function LoginPage() {
  const dispatch= useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState('login');
  const [error, seterror] = useState('');
  
  const [usercredentials,setusercredentials] = useState({});

  onAuthStateChanged(auth,(user)=>{
    if(user){
      dispatch(setuser({id:user.uid,email :user.email}));

    }else{
      dispatch(setuser(null));
    }
    if(isLoading){setIsLoading(false)};
  });
  function handlecredential(e){
    setusercredentials({...usercredentials,[e.target.name]: e.target.value});
  }

  function handlesignup(e){
    
    e.preventDefault();
    seterror("");
    createUserWithEmailAndPassword(auth,usercredentials.email,usercredentials.password)
    .catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      seterror(error.message);
    });

  }

  function handlelogin(e){
    
    e.preventDefault();
    seterror("");
    signInWithEmailAndPassword(auth,usercredentials.email,usercredentials.password)
    .catch((error)=>{
      seterror(error.message);
    });

  }

  function handlepasswordreset(){
    const email = prompt('Please enter your email');
    sendPasswordResetEmail(auth,email);
    alert('Email sent!! Check your inbox for password reset')
  }
    return (
      <>
        { isLoading && <FullPageLoader></FullPageLoader> }
        
        <div className="container login-page">
          <section>
            <h1>Welcome to the Book App</h1>
            <p>Login or create an account to continue</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Login
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Signup
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>Email *</label>
                      <input onChange={(e)=>handlecredential(e)} type="text" name="email" placeholder="Enter your email" />
                  </div>
                  <div className="form-control">
                      <label>Password *</label>
                      <input onChange={(e)=>handlecredential(e)} type="password" name="password" placeholder="Enter your password" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button onClick={(e)=>{handlelogin(e)}} className="active btn btn-block">Login</button>
                    : 
                    <button onClick={(e)=>{handlesignup(e)}} className="active btn btn-block">Sign Up</button>
                  }
                  {
                    error && 
                  <div className="error">
                      {
                        error
                      }
                  </div>
                  }

                  <p onClick={handlepasswordreset} className="forgot-password">Forgot Password?</p>
                  
              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default LoginPage
  