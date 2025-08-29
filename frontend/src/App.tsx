import "./App.css";
import Crud from "./Components/CRUD/Crud.tsx";
import Login from "./Components/LoginForm/Login.tsx";
import Signup from "./Components/LoginForm/Signup.tsx";


function App() {

  return (
    <div>
      <Crud /> 
      <Login />
      <Signup />
    </div>
  )

}

export default App;
