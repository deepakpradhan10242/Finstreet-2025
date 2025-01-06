import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import Events from "../pages/event";
import Calendar from "../pages/Calendar";
import EventCard from "../components/EventCard";
import Login from "../pages/Login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import Layout from "../layout/layout";
import ResetPassword from "../pages/ResetPassword";
import EmailVerify from "../pages/EmailVerify";
import Developer from "../developer/Developer";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Layout><Home/></Layout> 
            },
            {
                path:"/events",
                element:<Layout> <Events/> </Layout> 
            },
            {
                path:"/events/:id",
                element:<Layout> <EventCard/> </Layout> 
            },
            {
                path:"/calendar",
                element:<Layout> <Calendar/> </Layout> 
            },
            {
                path:"/user/dashboard",
                element: <Dashboard/>
            },
            {
                path:"/user/login",
                element:<Layout> <Login/></Layout>
            },
            {
                path:"/user/register",
                element:<Layout> <Register/> </Layout> 
            },
            {
                path:"/user/reset-password",
                element:<Layout> <ResetPassword/> </Layout> 
            },
            {
                path:"/user/email-verify",
                element:<Layout> <EmailVerify/> </Layout> 
            },
            {
                path:"/developer",
                element:<Layout> <Developer/> </Layout> 
            },
            
        ]
    },

]);

export default router;