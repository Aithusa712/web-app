import { useState } from 'react'
// import logo from './assets/inventory_logo.png'
import email_logo from './assets/email.png'
import pass_logo from './assets/password.png'
import confirmPass_logo from './assets/confirm.png'
import user_logo from './assets/user.png'

import './Signup.css'

// TODO: 
// user database model
// create Post request in the backend api to store user Data into user database.
// encrypt password (maybe implement this or fuck their privacy idc).
// Fetch -> Axios

function Signup() {
  const backendURL = "http://localhost:5123/register"
  const [userName, setName] = useState<string>("");
  const [userEmail, setEmail] = useState<string>("");
  const [userPass, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  /* TODO: Delete the setState below. Only used for debugging. 
   * Dont forget to remove the Debug button in return and setState 
   * method in submitData().*/
  const [userJSON, setUserJSON] = useState<string>("");

  async function submitData() {
    if (!validateForm()) {
      return
    }
    const userData = {
      username: userName,
      email: userEmail,
      password: userPass,
    }

    const currentJSON = JSON.stringify(userData); // TODO: Remove
     await fetch(backendURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    try {
    await fetch(backendURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    }
    catch (err){
      console.error(`Fetch failed: ${err}`);
      alert(`Fetch failed: ${err}`);
    }
    setUserJSON(currentJSON); // TODO: Remove
    alert(currentJSON);       // TODO: Remove
    setName('');
    setEmail('');
    setPass('');
    setConfirmPass('');

  }



  function validateForm() {
    let user_isEmpty = false;
    let email_isEmpty = false;
    let password_isEmpty = false;
    const missingInfo = [];


    if (userName == "") {
      user_isEmpty = true;
      missingInfo.push("Username");
    }
    if (userEmail == "") {
      email_isEmpty = true;
      missingInfo.push("Email");
    }
    if (userPass == "") {
      password_isEmpty = true;
      missingInfo.push("Password");
    }
    if (user_isEmpty || email_isEmpty || password_isEmpty) {

      let text = "";
      for (const info of missingInfo) {
        text += `\n${info} is Required`;
      }
      if (userPass != confirmPass) {
        text += "\nPassword does not match"
      }

      alert(text);
      return false;
    }

    else {
      return true;
    }


  }


  function changeLogoColor() {
    if (userPass === confirmPass) {
      return "invertLogo";
    }
    else {
      return "normal";
    }
  }

  function passIsEmpty(password: string) {
    if (password != '') {
      return (
        <div className='confirmPasswordContainer'>
          <img src={confirmPass_logo} width={30} height={30} className={changeLogoColor()}></img>
          <input type='password' name="confirmPassword" placeholder='Confirm Password' onChange={(e) => setConfirmPass(e.target.value)}></input>
        </div>
      );
    }
  }



  return (
    <>
      {/* <img src={logo} width={150} height={150} className='logo'></img> */}

      <h1 className='title'>Sign Up Form</h1>

      {/*Form*/}
      <fieldset className='container'>
        <form action={submitData}>

          {/*Sign Up  */}
          <legend><h3>Sign Up</h3></legend>

          {/*Username Container*/}
          <div className='userContainer'>
            {/*User Logo*/}
            <img src={user_logo} width={30} height={30} className='invertLogo'></img>
            {/*Username Textbox*/}
            <input type="text" name="userName" value={userName} placeholder="Enter Username" onChange={(e) => setName(e.target.value)}>
            </input>
          </div>


          {/*Email Container*/}
          <div className='emailContainer'>
            {/*Email Logo*/}
            <img src={email_logo} width={30} height={30} className='invertLogo'></img>
            {/*Email Textbox*/}
            <input type="email" name="email" value={userEmail} placeholder="Enter Email Address" onChange={(e) => setEmail(e.target.value)}>
            </input>
          </div>

          {/*Password Container*/}
          <div className='passwordContainer'>
            {/*Password Logo*/}
            <img src={pass_logo} width={30} height={30} className='invertLogo'></img>
            {/*Password Textbox*/}
            <input type="password" value={userPass} name="password" placeholder="Enter Password" onChange={(e) => setPass(e.target.value)}>
            </input>
          </div>

          {passIsEmpty(userPass)}



          {/*Submit button*/}
          <button type="submit" className='submitBtn'>Submit</button>
          <button className='submitBtn' onClick={() => alert(userJSON)}>Show Previous State</button>



        </form>
      </fieldset >
    </>
  )
}


export default Signup;
