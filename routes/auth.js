const express = require('express')
const router = express.Router()
const Item = require('../Model/item')
const {hashedPassword,comparePassword} = require('../hashing/bcrypt')



// Create Account
router.post('/signup',async(req,res)=>{
   try{
    console.log("Received request:", req.body);
    const {First_Name,Last_Name,Username,Email,password} = req.body; 
    if (!First_Name || !Last_Name || !Username || !Email || !password) {
        console.error("Missing fields:", { First_Name, Last_Name, Username, Email, password });
        return res.status(400).json({ message: "All fields are required" });
      }
    
    const existingUser = await Item.findOne({Email})
    if(existingUser){
       return res.status(400).json({message:'User already exist'})
    }
    console.log("hashig Password")
    const hash = await hashedPassword(password)
    console.log('hashing')
    const saveInfo =  new Item({First_Name,Last_Name,Username,Email,password:hash})
    console.log("attempting")
    await saveInfo.save();
    console.log("saved")

   return res.status(201).json({message:"Register successfully"}) 
   } catch(err){
    console.log("error while saving user:",err)
         res.status(500).json({msg:err.message})
   }
})

// Login 
router.post('/login', async (req, res) => {
  try {
      console.log('Request received:', req.body);

      const { Username, password } = req.body;

      // Validate input
      if (!Username || !password) {
          return res.status(400).json({ message: 'Username and password are required' });
      }

      console.log('Finding user in database...');
      const userExist = await Item.findOne({ Username }).select('+password');
      if (!userExist) {
          console.log('User not found');
          return res.status(404).json({ error: 'User Not Found' });
      }

      console.log('User found:', userExist);

      // Compare password
      const isMatch = await comparePassword(password, userExist.password);
      if (!isMatch) {
          console.log('Invalid credentials');
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      console.log('Login successful');
      return res.status(200).json({ message: 'Login Successfully' });
  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: `Network error: ${err.message}` });
  }
});


module.exports = router;