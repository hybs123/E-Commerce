import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Placeorder from "./pages/Placeorder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import ScrollToTop from "./components/ScrollToTop";
import Backend from "./pages/backend";
import Backendorders from "./pages/backendorders";
import AdminPanel from "./pages/adminpanel";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] text-yellow-900">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <ScrollToTop />

      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/collection" component={Collection} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/product/:productId" component={Product} />
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/placeorder" component={Placeorder} />
          <Route path="/orders" component={Orders} />
          <Route path="/backend" component={Backend} />
          <Route path="/backendorders" component={Backendorders} />
          <Route path="/adminpanel" component={AdminPanel} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>

      <Footer />
    </div>
  );
};

export default App;
