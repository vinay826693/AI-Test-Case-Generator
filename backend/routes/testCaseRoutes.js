// const express=require("express");

// const router=express.Router();

// const {
// generateTestCases
// }=require("../services/openAIService");

// router.post("/generate",async(req,res)=>{

// try{

// const {requirement}=req.body;

// const result=await generateTestCases(
// requirement
// );

// res.status(200).json({

// success:true,
// data:result

// });

// }

// catch(error){

// console.log(error);

// res.status(500).json({

// success:false,
// message:"Generation failed"

// });

// }

// });

// module.exports=router;


const express = require("express");

const router = express.Router();

const {
  generateTestCases
} = require("../services/openAIService");

router.post("/generate", async (req, res) => {

  try {

    const { requirement } = req.body;

    // Validation
    if (!requirement || requirement.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Requirement is required"
      });
    }

    const result = await generateTestCases(requirement);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Generation failed"
    });

  }

});

module.exports = router;