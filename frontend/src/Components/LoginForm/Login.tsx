import { useState } from 'react'
// import logo from './assets/inventory_logo.png'
import email_logo from './assets/email.png'
import pass_logo from './assets/password.png'
import './Login.css'
// import Signup from './Signup.tsx'

// TODO: 
// user database model 
// backend api request to handle user validation (userExist?) (passwordCorrect?)
// implement 2FA (If im bored).
// Fetch -> Axios

function Login() {

  const [userEmail, setEmail] = useState<string>("");
  const [userPass, setPass] = useState<string>("");

  function submitData(formData: FormData) {
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;
    if (!isEmpty(email, password)) {

      console.log(typeof (email));
      setEmail(email);
      setPass(password);

    }
  }

  function isEmpty(email: string, password: string) {
    let emailIsEmpty = false;
    let passIsEmpty = false;

    if (email == "") {
      emailIsEmpty = true;
    }
    if (password == "") {
      passIsEmpty = true;
    }

    if (emailIsEmpty && passIsEmpty) {
      alert("Email and Password Required");
      return true;
    }
    else if (emailIsEmpty) {
      alert("Email Address Required");
      return true;
    }
    else if (passIsEmpty) {
      alert(("Password Required"));
      return true;
    }
    else {
      return false;
    }


  }

  function sendStateAlert() {
    console.log(`Data Submitted!\nNew State:\nEmail: ${userEmail}\nPassword: ${userPass}`)
  }

  return (
    <>
      {/* <img src={logo} width={150} height={150} className='logo'></img> */}
      <hr></hr>
      <h1 className='title'>Sign In Form</h1>

      {/*Form*/}
      <fieldset className='container'>
        <form action={submitData}>

          {/*Sign Up  */}
          <legend><h3>Sign In</h3></legend>

          {/*Email Container*/}
          <div className='emailContainer'>
            {/*Email Logo*/}
            <img src={email_logo} width={30} height={30} className='email_logo'></img>
            {/*Email Textbox*/}
            <input type="email" name="email" placeholder="Enter Email Address">
            </input>
          </div>

          {/*Password Container*/}
          <div className='passwordContainer'>
            {/*Password Logo*/}
            <img src={pass_logo} width={30} height={30} className='pass_logo'></img>
            {/*Password Textbox*/}
            <input type="password" name="password" placeholder="Enter Password">
            </input>
          </div>

          {/*Submit button*/}
          <button type="submit" className='submitBtn'>Submit</button>
          <button className='submitBtn' onClick={sendStateAlert}>GetState Debug</button>


        </form>
      </fieldset >
      {/* <a href="#" onClick={<Signup />}>Signup?</a> */}
    </>
  )
}

export default Login;
