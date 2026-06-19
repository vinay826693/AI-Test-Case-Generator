import axios from "axios";

//const API_URL="http://localhost:5000/api/testcases";
const API_URL =
  window.location.hostname === "host.docker.internal"
    ? "http://host.docker.internal:5000/api/testcases"
    : "http://localhost:5000/api/testcases";

export const generateTestCases=async(
requirement:string
)=>{

const response=await axios.post(

`${API_URL}/generate`,
{
requirement
}

);

return response.data.data;

};