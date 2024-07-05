import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { matchPath } from 'react-router-dom';




const SidebarLink = ({link,iconName}) => {

    const Icon=Icons[iconName];
    const location=useLocation();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const matchRoute= (route)=>{
        return matchPath({path:route},location.pathname);
    }

  return (
    <NavLink 
    to={link.path}
    onClick={()=> navigate(`${link.path}`)}
    className={`relative px-8 py-2 text-white text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-400" : "bg-opacity-0"}`}>

        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50
        ${matchRoute(link.path) ? "opacity-100" : "opacity-0" }`}>

        </span>

        <div className='flex gap-2'>
            <Icon className="text-lg"/>
            <span>{link.name}</span>
        </div>

    </NavLink>
  )
}

export default SidebarLink