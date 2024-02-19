import User from '../Models/userModel.js';

const AllUsers =  async ( req , res) =>{
  try {
      const users = await User.find().select('userName _id');
      res.status(200).json({success : true , users:users});
  } catch (error) {
    res.status(500).json({success:false , 
        message:"Something went wrong while fetching users" , error:error});
  }
}

export default AllUsers ; 