const express=require("express");
const cors=require("cors");

const testCaseRoutes=require("./routes/testCaseRoutes");

const app=express();

app.use(cors());

app.use(express.json());

app.use("/api/testcases",testCaseRoutes);

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{

console.log(`Server running on ${PORT}`);

});