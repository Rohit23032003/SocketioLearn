import User from '../Models/userModel.js';

const ConnectedUsers =  async ( req , res) =>{
    const currentUserId = req.params.id.slice(1);
  try {
      const users = await User.findOne({_id:`${currentUserId}`}).select('connections');
      res.status(200).json({success : true , users:users});
  } catch (error) {
    res.status(500).json({success:false , 
        message:"Something went wrong while fetching users" , error:error});
  }
}

export default ConnectedUsers ; 

