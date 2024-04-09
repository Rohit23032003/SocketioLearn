import Request from '../Models/ConnectionRequest.js';
import  User from '../Models/userModel.js';

const UserRequest= async(req , res)=>{
    try {
        const  { senderId  ,receiverId , senderUserName , 
        senderUserProfile,
        receiverUserName,
        receiverUserProfile
        } = req.body;

        const request = new Request({
            senderId,
            receiverId,
            senderUserName,
            senderUserProfile,
            receiverUserName,
            receiverUserProfile
        });

        await request.save();
        res.status(200).json({success:true , message:'Request Send' , request});
    } catch (error) {
        res.status(500).json({success:false , message:'Error while sending request' , error });
    }
}


const RequestAccept = async (req, res) => {
    try {
        const { currentUser , senderId , userName , userProfile} = req.body;
        // Update the current user's connections array
        const updatedUser = await User.findById({_id:`${currentUser}`});
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        updatedUser.connections.push({
            senderId,
            userName,
            userProfile
        });

        await updatedUser.save();    

        const updateSenderUser = await User.findById({_id:`${senderId}`});

        updateSenderUser.connections.push({
            senderId:currentUser,
            userName:updatedUser.userName,
            userProfile:updatedUser.userProfile
        });

        await updateSenderUser.save();
        res.status(200).json({ success: true, message: "Request Accepted", currentUser: updatedUser  , updateSenderUser});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: 'Error while Accepting Request', error });
    }
}


const RequestReceived = async (req, res) => {
    try {
        const {currentUser} = req.body;
        const requests = await Request.find({ receiverId: currentUser , requestStatus: true });
        res.status(200).json({success : true , requests}); // Send the requests back to the client
    } catch (error) {
        console.error(error);
        res.status(500).json({ success:false ,  error: 'Internal Server Error' }); // Send an error response if something goes wrong
    }
}


const RequestSent = async (req, res) => {
    try {
        const {currentUser} = req.body;
        const requests = await Request.find({ senderId: currentUser });
        res.status(200).json({success : true , requests}); // Send the requests back to the client
    } catch (error) {
        console.error(error);
        res.status(500).json({ success:false ,  error: 'Internal Server Error' }); // Send an error response if something goes wrong
    }
}



const  requestStatusChange = async(req, res) => {
        try {
            const {requestId} = req.body;
            const UpdateRequest = await Request.findByIdAndUpdate(requestId, { requestStatus: false }, { new: true });
            UpdateRequest.requestStatus = false; 
            await UpdateRequest.save();
            res.status(200).json({success:true , UpdateRequest}); 
        } catch (error) {
            res.status(500).json({success:false , message:"Error While Change Status of Request" , error:error});
        }
}



const deleteRequest = async (req , res) => {
    try {
        const {requestId} = req.body;
        const deletedRequest = await Request.findOneAndDelete({ _id: requestId });
        res.status(200).json({success:true , deletedRequest}); 
    } catch (error) {
        res.status(500).json({success:false , message:"Error While deleting Request" , error:error});
    }
}



export  {UserRequest , RequestAccept , 
    RequestReceived , deleteRequest ,
     requestStatusChange , RequestSent};


