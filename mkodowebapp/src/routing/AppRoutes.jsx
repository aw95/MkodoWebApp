//Routes
import * as Routes from '../routing/AppUrls';

//Home Component
import Home from "../pages/home/Home";

//Draw component
import DrawList from "../pages/draw/List";
import DetailedView from "../pages/draw/View";

//Ticket Component
import TicketView from "../pages/ticket/TicketView";

//Ticket Component
import Layout from "../pages/Layout";

//Ticket Component
import Menu from "../pages/Menu";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: Routes.Home,
        element: <Home />
    },
    {
        path: Routes.DrawList,
        element: <DrawList />
    },
    {
        path: Routes.DetailedView,
        element: <DetailedView />
    },
    {
        path: Routes.TicketView,
        element: <TicketView />
    },
    {
        path: Routes.Layout,
        element: <Layout />
    },
    {
        path: Routes.Menu,
        element: <Menu />
    }
];

export default AppRoutes;
