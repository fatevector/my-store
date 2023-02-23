import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./app/components/ui/navBar";
import Catalog from "./app/components/layout/catalog";
import Cart from "./app/components/layout/cart";
import Login from "./app/components/layout/login";
import User from "./app/components/layout/user";
import LogOut from "./app/components/layout/logOut";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route exact path="/" component={Catalog} />
                <Route exact path="/product/:id" component={Catalog} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/login/:type?" component={Login} />
                <Route exact path="/profile/:edit?" component={User} />
                <Route exact path="/logout" component={LogOut} />
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </div>
    );
}

export default App;
