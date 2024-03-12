import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

const SideBar = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const NavLinkStyle = ({ isActive }) => {
        return {
            backgroundColor: isActive ? '#b5c4ff' : '#4e73df'
        }
    }


    const [style, setStyle] = useState("navbar-nav bg-primary sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style === "navbar-nav bg-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-primary sidebar sidebar-dark accordion toggled");
        }
        else {
            setStyle("navbar-nav bg-primary sidebar sidebar-dark accordion")
        }
    };



    const [adminData,setAdminData] = useState({})

     const adminId = localStorage.getItem('adminId');

   //  alert(token)

   useEffect(()=>{


    axios.get(apiUrl+`admin/getById?id=${adminId}`).then(response=>{
     console.log(response.data,'resp admin profile');
     setAdminData(response.data);



    })

  

 },[])
    return (
        <div style={{ backgroundColor: 'rgb(39 78 194)' }}>
            <ul className={style} id="accordionSidebar">

                {/*  <!-- Sidebar - Brand --> */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="#">
                   <div>
                    <img src={apiUrl+`images/${adminData?.logo}`} width="60px" alt='' />
                   </div>
                    <div className="sidebar-brand-text mx-3">Zahour</div>
                    <div className="text-center d-none d-md-inline tw-h-[38px]">
                        <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                    </div>
                </Link>

                {/*   <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/*  <!-- Nav Item - Dashboard --> */}
                <li className="nav-item active">
                    
                    <NavLink style={NavLinkStyle} className="nav-link" to="/dashboard" >
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></NavLink>
                </li>


                {/*  <!-- Nav Item - Pages Collapse Menu --> */}
                <li className="nav-item">
                    <NavLink className="nav-link collapsed text-white" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog text-white"></i>
                        <span className='fw-bold'>Users</span>
                    </NavLink>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar" style={{ backgroundColor: 'rgb(68 106 215)' }}>
                        <div className="collapse-inner rounded">
                            <NavLink style={NavLinkStyle} className="collapse-item text-white m-1" to="/approvedUsers">Approved</NavLink>
                            <NavLink style={NavLinkStyle} className="collapse-item text-white m-1" to="/Denied_users">Pending</NavLink>
                        </div>
                    </div>
                </li>
                <li className="nav-item active">
                    <NavLink style={NavLinkStyle} className="nav-link" to="/tickets" >
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Tickets</span></NavLink>
                </li>
                <li className="nav-item active">
                    <NavLink style={NavLinkStyle} className="nav-link" to="/categories" >
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Categories</span></NavLink>
                </li>
                <li className="nav-item active">
                    <NavLink style={NavLinkStyle} className="nav-link" to="/sub_category" >
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Sub Categories</span></NavLink>
                </li>

                <li className="nav-item active">
                    <NavLink style={NavLinkStyle} className="nav-link" to="/Notifications" >
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Notifications</span></NavLink>
                </li>

                {/* <li className="nav-item active">
                    <NavLink style={NavLinkStyle} className="nav-link" to="/Chat" >
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Chat</span></NavLink>
                </li> */}

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider d-none d-md-block" />





            </ul>
        </div>
    )
}

export default SideBar