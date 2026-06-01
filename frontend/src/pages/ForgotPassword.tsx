import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function ForgotPassword(){

const navigate=useNavigate();

const [newPassword,setNewPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");

const handleReset=()=>{

if(!newPassword || !confirmPassword){

alert("Please fill all fields");
return;

}

if(newPassword!==confirmPassword){

alert("Passwords do not match");
return;

}

const user=JSON.parse(
localStorage.getItem("user") || "{}"
);

localStorage.setItem(
"user",
JSON.stringify({
...user,
password:newPassword
})
);

alert("Password updated successfully");

navigate("/");

};

return(

<div className="login-page">

<div className="login-right">

<div className="test-card">

<h2>Reset Password</h2>

<label className="input-label">

New Password

</label>

<input
className="login-input"
type="password"
placeholder="Enter New Password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
/>

<label className="input-label">

Confirm Password

</label>

<input
className="login-input"
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
/>

<button
className="generate-btn"
onClick={handleReset}
>

Update Password

</button>

</div>

</div>

</div>

);

}

export default ForgotPassword;