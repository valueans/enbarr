import React from 'react'

const AuthenticationTabs = ({title,isActive,onClick,borderRadius}) => {

  
  return (
    isActive?<div onClick={()=>{
      onClick(title)
    }} style={{background: "#302F32",borderRadius:borderRadius,border:"1px solid transparent",cursor:"pointer",height:"40px",textAlign:"center",color:"#FFFFFF",display:"flex",alignItems:"center",justifyContent:"center"}}>{title}</div>:<div onClick={()=>{onClick(title)}} style={{background: "#FFFFFF",cursor:"pointer",borderRadius: borderRadius,border:"1px solid transparent",height:"40px",textAlign:"center",color:"#302F32",display:"flex",alignItems:"center",justifyContent:"center"}}>{title}</div>
  )
}

export default AuthenticationTabs