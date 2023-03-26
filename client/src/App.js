import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useTheme } from "./app/components/hooks/useTheme";

import ProtectedRoute from "./app/components/common/protectedRoute";
import NavBar from "./app/components/ui/navBar";
import Catalog from "./app/components/layout/catalog";
import Admin from "./app/components/layout/admin";
import Cart from "./app/components/layout/cart";
import Login from "./app/components/layout/login";
import User from "./app/components/layout/user";
import LogOut from "./app/components/layout/logOut";

function App() {
    const { theme } = useTheme();

    return (
        <div className={`App ${theme}`} data-bs-theme={theme}>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Catalog} />
                <Route exact path="/product/:id" component={Catalog} />
                <ProtectedRoute
                    exact
                    path="/admin/:mode?/:productId?"
                    component={Admin}
                />
                <ProtectedRoute exact path="/cart" component={Cart} />
                <Route exact path="/login/:type?" component={Login} />
                <ProtectedRoute exact path="/profile/:edit?" component={User} />
                <Route exact path="/logout" component={LogOut} />
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </div>
    );
}

export default App;
