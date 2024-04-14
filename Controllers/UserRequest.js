// import Request from '../Models/ConnectionRequest.js';
import  User from '../Models/userModel.js';


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


export  { RequestAccept };


