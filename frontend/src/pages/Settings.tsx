import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function Settings(){

const user=JSON.parse(
localStorage.getItem("user") || "{}"
);

const [name,setName]=useState(
user.email?.split("@")[0] || ""
);

const [email,setEmail]=useState(
user.email || ""
);

const [oldPassword,setOldPassword]=useState("");
const [newPassword,setNewPassword]=useState("");

const updateProfile=()=>{

const updatedUser={

...user,
name,
email

};

localStorage.setItem(
"user",
JSON.stringify(updatedUser)
);

alert(
"✅ Profile updated successfully"
);

};

const changePassword=()=>{

if(!oldPassword || !newPassword){

alert(
"Please fill all password fields"
);

return;

}

if(newPassword.length<6){

alert(
"Password must be at least 6 characters"
);

return;

}

alert(
"✅ Password changed successfully"
);

setOldPassword("");
setNewPassword("");

};

return(

<>

<Sidebar/>

<div className="main-content">

<div className="dashboard-container">

<h1 className="dashboard-title">

Settings

</h1>

<div className="settings-container">

{/* Profile */}

<div className="settings-card">

<h2>

Profile Details

</h2>

<label>

Full Name

</label>

<input
className="login-input"
value={name}
onChange={(e)=>
setName(e.target.value)
}
placeholder="Full Name"
/>

<label>

Email

</label>

<input
className="login-input"
value={email}
onChange={(e)=>
setEmail(e.target.value)
}
placeholder="Email"
/>

<button
className="generate-btn"
onClick={updateProfile}
>

Update Profile

</button>

</div>

{/* Password */}

<div className="settings-card">

<h2>

Change Password

</h2>

<label>

Current Password

</label>

<input
className="login-input"
type="password"
value={oldPassword}
onChange={(e)=>
setOldPassword(e.target.value)
}
placeholder="Current Password"
/>

<label>

New Password

</label>

<input
className="login-input"
type="password"
value={newPassword}
onChange={(e)=>
setNewPassword(e.target.value)
}
placeholder="New Password"
/>

<button
className="generate-btn"
onClick={changePassword}
>

Change Password

</button>

</div>

</div>

</div>

</div>

</>

);

}

export default Settings;