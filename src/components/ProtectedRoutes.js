import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Wrapper from '../pages/Wrapper';
import Dashboard from '../pages/Dashboard';
import ApprovedUsers from '../pages/Users/ApprovedUsers';
import EditUsers from '../pages/Users/EditUsers';
import DeniedUsers from '../pages/Users/DeniedUsers';
import Categoires from '../pages/Category/Categories';
import Sub_Category from '../pages/SubCategory/Sub_Category';
import Tickets from '../pages/Tickets/Tickets';
import AddCategory from '../pages/Category/AddCategory';
import AddSubCategory from '../pages/SubCategory/AddSubCategory';
import EditTicket from '../pages/Tickets/EditTicket';
import Chat from '../pages/Chat/Chat';
import Profile from '../pages/profile/profile';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Notifications from '../pages/Notifications/Notifications';
import AddNotifications from '../pages/Notifications/AddNotifications';
const ProtectedRoute = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const location = useLocation();
    let token = localStorage.getItem("token")
    let [loading, setLoading] = useState(true)

    const [adminData, setAdminData] = useState({})

    const adminId = localStorage.getItem('adminId');
    

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    let authenticate = await axios.post(apiUrl + "admin/session-check", { "token": token })
                    if (!authenticate.data) {
                        localStorage.removeItem("token")
                        navigate("/")
                    }
                } catch (error) {
                    console.log(error)
                }

            } else {
                navigate("/")
            }
            setLoading(false)
        }
        const storeFCM =async () => {
           
            let obj = { fcmToken: localStorage.getItem("fcmToken") }
            let token = await axios.put(apiUrl + "admin/fcmTokenUpdate", obj)
            console.log(token)
        }
        // axios.get(apiUrl + `admin/getById?id=${adminId}`).then(response => {
        //     console.log(response.data, 'resp admin profile');
        //     setAdminData(response.data);




        // })

        // let obj={fcmToken:localStorage.getItem("fcmToken")}
        // await axios.put("admin/fcmTokenUpdate",obj)


        fetchData();
        storeFCM();
    }, [location])




    return (
        <>
            {loading ? <div role="status" className='tw-flex tw-justify-center tw-items-center tw-h-screen'>
                <svg aria-hidden="true" class="tw-w-16 tw-h-16 tw-mr-2 tw-text-gray-200 tw-animate-spin dark:text-gray-600 tw-fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="tw-text-black tw-font-semibold tw-text-lg">Loading...</span>
            </div> : <Routes>
                <Route element={<Wrapper />}>
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/approvedUsers' element={<ApprovedUsers />} />
                    <Route path='/Denied_users' element={<DeniedUsers />} />
                    <Route path='/categories' element={<Categoires />} />
                    <Route path='/sub_category' element={<Sub_Category />} />
                    <Route path='/tickets' element={<Tickets />} />
                    <Route path='/editTicket/:id' element={<EditTicket />} />
                    <Route path='/editUsers/:id' element={<EditUsers />} />
                    <Route path='/editUsers' element={<EditUsers />} />
                    <Route path='/Add_Category' element={<AddCategory />} />
                    <Route path='/Add_Category/:id' element={<AddCategory />} />
                    <Route path='/Add_Sub_Category' element={<AddSubCategory />} />
                    <Route path='/Add_Sub_Category/:id' element={<AddSubCategory />} />
                    <Route path='/chat/:id/:ticketID' element={<Chat />} />
                    <Route path='/Notifications' element={<Notifications />} />
                    <Route path='/Add_Notifications' element={<AddNotifications />} />
                    <Route path='/Add_Notifications/:id' element={<AddNotifications />} />
                </Route>
            </Routes>}
        </>
    )
}

export default ProtectedRoute