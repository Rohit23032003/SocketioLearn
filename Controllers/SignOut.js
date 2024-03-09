
const SignOut = async(req ,res) => {
   await  res.clearCookie('accessToken');
   await  res.clearCookie('refreshToken');
    res.status(201).json({ success:true , message: "SignOut Sucessfully"});
}
export default SignOut ;

