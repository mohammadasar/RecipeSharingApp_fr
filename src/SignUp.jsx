import {  useState } from "react";
import './Style.css';

function SignUp() {
    const [signData, setSignData] = useState({
       
        username: '',
        email:'',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignData({ ...signData, [name]: value });
        console.log(name, value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(signData);

        fetch('http://localhost:8080/SignIn/setSignIn', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(signData)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        })
        .then((data) => {
            console.log("fetched data", data);
            setSignData(data);
        })
        .catch((error) => {
            console.error("Error detected", error);
        });
    
    };

    return (
        <div className="form-container " id="SingUp" >
            <h1>Sign In</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-box">
                <div>
                    <label htmlFor="username">UserName</label><br></br>
                    <input type="text" name="username" value={signData.username} onChange={handleChange} placeholder="Enter Username" className="text-dark"></input>
                </div>
                 <div>
                    <label htmlFor="Email">Email</label><br></br>
                    <input type="email" name="email" value={signData.email} onChange={handleChange} placeholder="Enter Email" className="text-dark"></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label><br></br>
                    <input type="password" name="password" value={signData.password} onChange={handleChange} placeholder="Enter Password" className="text-white"></input>
                </div>
                <input type="submit" value="Submit" className="submit"></input>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
