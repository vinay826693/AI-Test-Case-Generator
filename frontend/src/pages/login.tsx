import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/dashboard.css";

function Login(){

const navigate=useNavigate();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const [showPassword,setShowPassword]=useState(false);
const [rememberMe,setRememberMe]=useState(false);
const [loading,setLoading]=useState(false);

const handleLogin=()=>{

if(!email || !password){

alert("Please enter email and password");
return;

}

setLoading(true);

setTimeout(()=>{

localStorage.setItem(
"user",
JSON.stringify({
email
})
);

navigate("/dashboard");

},1500);

};

return(

<div className="login-page">

<div className="login-left">

<h1>AI QA Generator</h1>

<p>
Generate intelligent AI-based test cases instantly
</p>

<div className="demo-card">

<h3>Demo Credentials</h3>

<p>Email: test@gmail.com</p>
<p>Password: test123</p>

</div>

</div>

<div className="login-right">

<div className="test-card">

<h2>Login</h2>

<label className="input-label">
Email
</label>

<input
className="login-input"
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<label className="input-label">
Password
</label>

<div className="password-container">

<input
className="login-input"
type={showPassword ? "text":"password"}
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<span
onClick={()=>setShowPassword(!showPassword)}
>

{showPassword ? "🙈":"👁"}

</span>

</div>

<div className="login-options">

<label>

<input
type="checkbox"
checked={rememberMe}
onChange={()=>
setRememberMe(!rememberMe)
}
/>

Remember Me

</label>

<Link to="/forgot-password">

Forgot Password?

</Link>

</div>

<button
className="generate-btn"
onClick={handleLogin}
disabled={loading}
>

{loading
? "Logging in..."
: "Login"}

</button>

</div>

</div>

</div>

);

}

export default Login;