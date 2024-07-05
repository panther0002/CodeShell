// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {

  const { token } = useSelector((state) => state.auth)  
  // mainly token a6e kina check kor6e

  if (token === null) {
    return children
  } 
  else {
    return <Navigate to="/dashboard/my-profile" />
  }
}

export default OpenRoute