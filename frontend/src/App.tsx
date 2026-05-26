import { BrowserRouter,Routes,Route } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";

function App(){

return(

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Login/>}
/>

<Route
path="/dashboard"
element={<Dashboard/>}
/>

<Route
path="/history"
element={<History/>}
/>

<Route
path="/settings"
element={<Settings/>}
/>

<Route
path="/forgot-password"
element={<ForgotPassword/>}
/>

</Routes>

</BrowserRouter>

);

}

export default App;