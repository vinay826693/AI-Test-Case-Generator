// const generateTestCases = async (requirement) => {

// const response=[

// {
// type:"Positive",
// testCase:`Verify ${requirement} works with valid input`
// },

// {
// type:"Negative",
// testCase:`Verify ${requirement} with invalid input`
// },

// {
// type:"Edge Case",
// testCase:`Verify ${requirement} with empty values`
// },

// {
// type:"API",
// testCase:`Verify API response for ${requirement}`
// },

// {
// type:"Validation",
// testCase:`Verify required field validation`
// }

// ];

// return response;

// };

// module.exports={
// generateTestCases
// };
















const OpenAI = require("openai");

const client = new OpenAI({

apiKey: process.env.GROQ_API_KEY,

baseURL: "https://api.groq.com/openai/v1",

});

const generateTestCases = async(requirement)=>{

try{

const response =
await client.chat.completions.create({

model:"openai/gpt-oss-20b",

messages:[

{
role:"system",
content:`

You are a QA expert.

Generate test cases in this format:

Positive:
1.
2.

Negative:
1.
2.

Edge Cases:
1.
2.

Validation:
1.
2.

Do NOT generate markdown tables.
Do NOT generate HTML tags.
Return plain text only.

`
},

{
role:"user",
content:
`Generate test cases for ${requirement}`
}

],

temperature:0.7

});

const generatedText =
response.choices[0].message.content;

return [

{
type:"AI Generated",
testCase:generatedText
}

];

}catch(error){

console.log(error);

throw error;

}

};

module.exports={
generateTestCases
};