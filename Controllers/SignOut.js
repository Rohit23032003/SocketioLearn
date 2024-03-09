
const SignOut = async(req ,res) => {
    res.cookie('accessToken' , "" , {httpOnly:true});
    res.cookie('refreshToken' , "", {httpOnly:true});;
    res.status(201).json({ success:true , message: "SignOut Sucessfully"});
}

export default SignOut ;

