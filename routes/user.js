const User = require("../models/User");
const router = require("./auth");
const {verifyToken,verifyTokenAndAuthorization}=require("./verifyToken");

router = require("express").Router();

router.put("/:id",verifyTokenAndAuthorization ,async (req,res)=>{
  if(req.body.password){
    req.body.password= CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(); 
  }
  try{
    const updateUser = await User.findByIdAndUpdate(
        req.params.id, 
        {
        $set:req.body 
    },
    {new:true}
    );

  res.status(200).json(updatedUser); 
}catch(err){res.status(500).json(err)}
});

//DElete
router.delete("/:id",verifyTokenAndAuthorization,async (req,res)=> {
    try{
     await User.findByIdAndDelete(req.params.id)
     res.status(200).json("User has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

//get user
router.get("/",verifyTokenaAndAdmin,async (req,res)=> {
    const query = req.query.new;
    try{
     const user = query? await User.find().sort(_id-1).limit(5): await user.find();
      
     res.status(200).json(users);
    }catch(err){
        res.status(500).json(err)
    }
});
// get user state
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;