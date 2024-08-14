import toast from "react-hot-toast"

import {setLoading,setToken} from "../../slices/authslice";
// import {resetCart} from "../../slices/cartSlice";
import {setUser} from "../../slices/profileslice";
import {apiConnector} from "../apiconnector";
import {endpoints} from "../apis";
import { useDispatch } from "react-redux";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints
  
export function sendOtp(email, navigate) {

  return async (dispatch) => {
   
    const toastId = toast.loading("Loading...")
    //1 : loading true
    
    dispatch(setLoading(true))
    //2 : call api 
    try {
      
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")

      navigate("/verify-email")    //############

    } 
    catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {

  return async (dispatch) => {
    
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      console.log("calling api")

      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful");

      dispatch(setToken(response.data.token))   //token set

      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      
      dispatch(setUser({ ...response.data.user, image: userImage})); //user set
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))

      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}

export function getPasswordResetToken(email,setEmailSent){

    return async(dispatch) =>{
        dispatch(setLoading(true));
        try {
            //call api to backedn
            const response=await apiConnector("POST",RESETPASSTOKEN_API,{email}); //body te kebol email e niye6e
            console.log("Reset password token response ",response);

            // jdi response error ase
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            // na asle
            toast.success("Reset Email sent");

            setEmailSent(true);

        } catch (error) {
            console.log("Reset password token error");
            toast.error("Failed to sent email")
        }

        dispatch(setLoading(false));
    }

}


export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      console.log("reset password 1")
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

      console.log("reset password 2")

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
}