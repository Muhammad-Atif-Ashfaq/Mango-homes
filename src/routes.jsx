import { useRoutes } from "react-router-dom/dist";
import Landing from "./Views/Landing/Landing";
import Login from "./Views/Auth/Login";
import Signup from "./Views/Auth/Signup";
import AgentLogin from "./Views/Auth/AgentLogin";
import AgentDashboard from "./layouts/Agent/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import { useSelector } from "react-redux";
import OTP from "./Views/Auth/Login/components/OTP";
import SignUpAgent from "./Views/Auth/SignUpAgent/SignUpAgent";
import Test from "./Test";
import CustomeSlider from "./CustomeSlider";
import HomeAgent from "./Views/Agent/Home/HomeAgent";
import AgentRequest from "./Views/Agent/AgentRequest";
import Message from "./Views/Agent/Message";
import ContactUs from "./Views/Agent/ContactUs";
import CustomerDashboard from "./layouts/Customer/DashboardCustomer/CustomerDashboard";
import CustomerRequest from "./Views/Customer/CustomerRequest";
import Form from "./Views/Customer/Form/Form";
import VerifyAcc from "./Views/VerifyAcc/VerifyAcc";
import CheckOut from "./Views/Customer/CheckOut/CheckOut";
import SendAgentRequest from "./Views/Agent/AgentRequest/components/SendRequest/SendAgentRequest";
import ChatBox from "./Views/Customer/CustomerRequest/components/ChatBox";
import LikedListing from "./Views/Agent/LikedListing";
import TestComp from "./Views/TestComp";
// import { lazy } from "react";
// const CustomerD = lazy(() =>
//   import("./layouts/Customer/DashboardCustomer/CustomerDashboard")
// );
// const AgentD = lazy(() => import("./layouts/Agent/Dashboard"));
export default function Router() {
  const isAuthenticatedUser = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const isAuthenticatedAgent = useSelector(
    (state) => state.auth.isAuthenticatedAgent
  );
  let element = useRoutes([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/agent-login",
      element: <AgentLogin />,
    },
    {
      path: "/register",
      element: <Signup />,
    },
    {
      path: "/register-agent",
      element: <SignUpAgent />,
    },
    {
      path: "/verify-account",
      element: <VerifyAcc />,
    },
    // {
    //   path: "/test",
    //   element: <MultiStepFormMui />,
    // },
    {
      element: <ProtectedRoutes isLogged={isAuthenticatedUser} />,
      children: [
        {
          path: "dashboard-customer",
          element: <CustomerDashboard />,
          children: [
            { path: "customer-req", element: <CustomerRequest /> },
            { path: "test", element: <TestComp /> },
            { path: "form", element: <Form /> },
            { path: "checkout", element: <CheckOut /> },
          ],
        },
      ],
    },
    {
      element: <ProtectedRoutes isLogged={isAuthenticatedAgent} />,
      children: [
        {
          path: "agent-dashboard",
          element: <AgentDashboard />,
          children: [
            { path: "home", element: <HomeAgent /> },
            { path: "agent-req", element: <AgentRequest /> },
            { path: "hot-leads", element: <LikedListing /> },
            { path: "messages", element: <Message /> },
            { path: "contact-us", element: <ContactUs /> },
            { path: "checkout", element: <CheckOut /> },
            { path: "send-info", element: <SendAgentRequest /> },
          ],
        },
      ],
    },
    // {
    //   path: "verify-otp/:id",
    //   element: <OTP />,
    // },
    {
      path: "/test",
      element: <Test />,
    },
    {
      path: "/slider",
      element: <CustomeSlider speed={23} />,
    },
    {
      path: "chat_Box",
      element: <ChatBox />,
    },
  ]);
  return element;
}
