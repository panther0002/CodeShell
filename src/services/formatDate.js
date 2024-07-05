export const formatDate = (dateString) => { 
    //"2024-06-26T14:35:00"
    const options = { year: "numeric", month: "long", day: "numeric" }
    //1 :
    const date = new Date(dateString) // June 26, 2024, 14:35:00.
    //2 :
    const formattedDate = date.toLocaleDateString("en-US", options)   //"June 26, 2024".
  
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const period = hour >= 12 ? "PM" : "AM"
    const formattedTime = `${hour % 12}:${minutes.toString().padStart(2, "0")} ${period}`
  
    return `${formattedDate} | ${formattedTime}`
  }