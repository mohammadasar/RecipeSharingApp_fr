import { BrowserRouter,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import RecipeAdminForm from './Adimin';
import Navbars from './Navbar';
import SignUp from'./SignUp';
// import Home from './Homepage';
// import ImageUploader from './ImageUploder';
import UserForm from './UserForm';
import Login from './Login'


function App() {
  return (
    <div >
      
  
     <BrowserRouter>
      <Routes>
         {/* <Route path="/" element={<Home/>} /> */}
        <Route path="/" element={<Navbars/>} />
        <Route path="/userform" element={<UserForm/>} />
        {/* <Route path="/Post" element={<RecipeAdminForm/>} /> */}
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/Login" element={<Login/>} />

      </Routes>
     </BrowserRouter>
       
    </div>
  );
}

export default App;
