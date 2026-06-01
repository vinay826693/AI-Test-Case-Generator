import { NavLink, useNavigate } from "react-router-dom";

function Sidebar(){

const navigate=useNavigate();

const handleLogout=()=>{

localStorage.removeItem("user");

navigate("/");

};

return(

<div className="sidebar">

<h2>AI QA Generator</h2>

<NavLink
to="/dashboard"
className={({isActive}) =>
isActive ? "sidebar-item active-item" : "sidebar-item"
}
>
🏠 Dashboard
</NavLink>

<NavLink
to="/history"
className={({isActive}) =>
isActive ? "sidebar-item active-item" : "sidebar-item"
}
>
📜 History
</NavLink>

<NavLink
to="/settings"
className={({isActive}) =>
isActive ? "sidebar-item active-item" : "sidebar-item"
}
>
⚙ Settings
</NavLink>

<button
className="sidebar-item"
onClick={handleLogout}
>
🚪 Logout
</button>

</div>

);

}

export default Sidebar;