import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom"
function Login() {

    const nav=useNavigate();
    const [data, setData] = useState({
        username: '',
        password: ''
    })

    // const [er, setError] = useState('')


    const dataChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
        console.log(data);
    }

    const handleSubmit = (event) => {
        event.preventDefault();


        fetch(`http://localhost:8080/SignIn/check?username=${data.username}&password=${data.password}`)
            .then((response) => {
                if (!response.ok) {
                    alert("Enter Valid Details");
                    throw new Error("failed to fetch data");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetch data:", data);
                setData(data)
                nav('/')
                console.log("successful fetched");

            })
            .catch((error) => {
                console.error("Error : ", error);
            })
    }
    return (
        <div className="form-container2 container-fluid d-flex flex-column justify-content-center align-items-center vh-100 w-100">
            <h1 className="mt-4 mb-3 text-center text-primary ">Log In</h1>
            <form onSubmit={handleSubmit} className="form1 row  text-dark  ">
                <div className="form-group pb-3 col-12 d-flex flex-column justify-content-center align-items-center" >
                    <div className="w-50 ">
                        <label htmlFor="username" className="pb-1 ps-2">Email</label>
                        <input type="text" name="username" value={data.username} onChange={dataChange} className="form-control w-100" id="UserName" placeholder="Enter your username" required />
                    </div>
                </div>
                <div className="form-group pb-3 col-12 d-flex flex-column justify-content-center align-items-center ">
                    <div className="w-50">
                        <label htmlFor="password" className="pb-1 ps-2">Password</label>
                        <input type="password" name="password" value={data.password} onChange={dataChange} className="form-control w-100" id="password" placeholder="Password" required />
                    </div>
                </div>
                <br />
                <div className="text-center col-12">
                    <button type="submit" className="btn btn-primary">Log In</button>
                    {/* <span>{setError}</span> */}
                </div>
                <div className="text-center col-12">
                    Don't have an Account? Click here <Link to={'/SignUp'}>SignUp</Link>
                </div>
            </form>

        </div>
    )
}
export default Login;
