const asyncHandler=require('express-async-handler');
const User = require('./userModels.js');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

const generatetoken = (id) => {
  return jwt.sign({ id }, "other", {
    expiresIn: "30d"
  });
};

 const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password,} = req.body;
    console.log(req.body)
    if (!name || !email || !password ) {
      console.log("Provide info")
      return res.status(400).json({
        
        message: "Not all information provided"
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const secret="other"
    const hashedpassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedpassword,secret});
   // console.log(user)
    if (user) {
      const token = generatetoken(user._id);
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
       
        token: token,
        message: "User created"
      });
    } else {
      return res.status(400).json({
       
        message: "Failed to create user"
      });
    }
  } catch (error) {
    next(error);
  }
});

 const loginUser = asyncHandler(async (req, res, next) => {
  try {
    console.log("hi")
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
     
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = generatetoken(user._id);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
     
      token: token,
      message: "Login successful"
    });
  } catch (error) {
    next(error);
  }
});



module.exports={registerUser,loginUser}