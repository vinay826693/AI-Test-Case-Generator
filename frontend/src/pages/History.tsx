import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function History(){

const [history,setHistory]=useState(

JSON.parse(
localStorage.getItem("history") || "[]"
)

);

const [message,setMessage]=useState("");

const deleteHistory=(index:number)=>{

const updatedHistory=

history.filter(
(_:any,i:number)=>i!==index
);

setHistory(updatedHistory);

localStorage.setItem(

"history",

JSON.stringify(updatedHistory)

);

setMessage(
"✅ History deleted successfully"
);

setTimeout(()=>{

setMessage("");

},3000);

};

return(

<>

<Sidebar/>

<div className="main-content">

<div className="dashboard-container">

<h1 className="dashboard-title">

History

</h1>

{message && (

<div className="success-message">

{message}

</div>

)}

<div
style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
width:"100%"
}}
>

{history.length===0 ? (

<h3>

No history found

</h3>

):(

history.map((item:any,index:number)=>(

<div
key={index}
className="dashboard-test-card"
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<h2 className="card-title">

Requirement: {item.requirement}

</h2>

<button
className="delete-btn"
onClick={()=>
deleteHistory(index)
}
>

🗑 Delete

</button>

</div>

<p>

Generated: {item.date}

</p>

<br/>

<h3>

AI Generated

</h3>

{item.testCases.map(
(test:any,testIndex:number)=>(

<div
key={testIndex}
style={{
marginBottom:"25px"
}}
>

<pre
style={{
whiteSpace:"pre-wrap",
fontFamily:"inherit",
margin:0
}}
>

{test.testCase}

</pre>

</div>

)
)}

</div>

))

)}

</div>

</div>

</div>

</>

);

}

export default History;