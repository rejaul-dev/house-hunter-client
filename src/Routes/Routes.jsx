import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import OwnerDashboardLayout from "../Layout/OwnerDashboardLayout";
import RenterDashboardLayout from "../Layout/RenterDashboardLayout";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import HouseOwnerDashboard from "../Pages/HouseOwnerDashboard";
import HouseRenterDashboard from "../Pages/HouseRenterDashboard";
import LoginPage from "../Pages/Login";
import RegisterPage from "../Pages/Register";
import EditHouseForm from "../components/EditHouseForm";
import AddHouseForm from "../components/OwnerDashboard/AddHouseForm";
import PrivateRoute from "./PrivateRoute";
import RenterPrivateRoute from "./RenterPrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/owner",
    element: (
      <PrivateRoute>
        <OwnerDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/owner/dashboard",
        element: <HouseOwnerDashboard />,
      },
      {
        path: "/owner/dashboard/add-house",
        element: <AddHouseForm />,
      },
      {
        path: "/owner/dashboard/edit-house/:id",
        element: <EditHouseForm/>,
      },
    ],
  },
  // Route for House Renter Dashboard
  {
    path: "/",
    element: (
      <RenterPrivateRoute>
        <RenterDashboardLayout />
      </RenterPrivateRoute>
    ),
    children: [
      {
        path: "/renter/dashboard",
        element: <HouseRenterDashboard />,
      },
    ],
  },
]);

export default router;
