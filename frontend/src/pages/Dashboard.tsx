import { useState } from "react";
import { generateTestCases } from "../services/testCaseService";
import "../styles/dashboard.css";
import Sidebar from "../components/Sidebar";

function Dashboard(){

const [requirement,setRequirement]=useState("");
const [testCases,setTestCases]=useState<any[]>([]);
const [loading,setLoading]=useState(false);

const summary={

Positive:0,
Negative:0,
Validation:0,
API:0,
"Edge Cases":0

};

testCases.forEach((item)=>{

const content=item.testCase || "";

if(content.includes("Positive:"))
summary.Positive=2;

if(content.includes("Negative:"))
summary.Negative=2;

if(content.includes("Edge Cases:"))
summary["Edge Cases"]=2;

if(content.includes("Validation:"))
summary.Validation=2;

if(content.includes("API:"))
summary.API=1;

});

const handleGenerate=async()=>{

if(!requirement){

alert("Please enter requirement");
return;

}

setLoading(true);

try{

const data=await generateTestCases(requirement);

setTestCases(data);

const history=JSON.parse(
localStorage.getItem("history") || "[]"
);

history.unshift({

requirement,
testCases:data,
date:new Date().toLocaleString()

});

localStorage.setItem(
"history",
JSON.stringify(history)
);

}
catch(error){

console.log(error);

alert("Something went wrong");

}
finally{

setLoading(false);

}

};

return(

<>

<Sidebar/>

<div className="main-content">

<div className="dashboard-container">

<h1 className="dashboard-title">

AI Test Case Generator

</h1>

<textarea
className="requirement-box"
placeholder="Enter requirement"
value={requirement}
onChange={(e)=>setRequirement(e.target.value)}
/>

<button
className="generate-btn"
onClick={handleGenerate}
disabled={loading}
>

{loading
? "Generating..."
: "Generate Test Cases"}

</button>

{loading && (

<div className="loading-container">

<p>

🤖 AI is generating test cases...

</p>

</div>

)}

{testCases.length>0 && (

<div className="summary-container">

{Object.entries(summary).map(
([key,value])=>(

<div
key={key}
className="summary-card"
>

<h3>{key}</h3>

<p>{value}</p>

</div>

)
)}

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

{testCases.map((test,index)=>(

<div
key={index}
className="dashboard-test-card"
>

<h2 className="card-title">

AI Generated

</h2>

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

))}

</div>

</div>

</div>

</>

);

}

export default Dashboard;