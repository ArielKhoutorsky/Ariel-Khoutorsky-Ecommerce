import React, { useContext, useReducer } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "./Store";
import CartScreen from "./Screens/CartScreen";
import SigninScreen from "./Screens/SigninScreen";
import ShippingAddressScreen from "./Screens/ShippingAddressScreen";
import SignupScreen from "./Screens/SignupScreen";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import OrderHistoryScreen from "./Screens/OrderHistoryScreen";
import ProfileScreen from "./Screens/ProfileScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="primary" variant="dark" className="nav-style">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="title">Shoppera</Navbar.Brand>
              </LinkContainer>
              <Nav className=" justify-content-end">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge className="acc" pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item className="nav-dropdown1">
                        User Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item className="nav-dropdown1">
                        Order History
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item nav-dropdown1"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3 main-cont">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              <Route path="/signin" element={<SigninScreen />} />
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route
                path="/orderhistory"
                element={<OrderHistoryScreen />}
              ></Route>
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/order/:id" element={<OrderScreen />}></Route>
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
            </Routes>
          </Container>
        </main>
      </div>
      <div className="footer-basic">
        <footer>
          <div className="social">
            <a href="#">
              <i className="icon ion-social-instagram"></i>
            </a>
            <a href="#">
              <i className="icon ion-social-snapchat"></i>
            </a>
            <a href="#">
              <i className="icon ion-social-twitter"></i>
            </a>
            <a href="#">
              <i className="icon ion-social-facebook"></i>
            </a>
          </div>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#">Home</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Services</a>
            </li>
            <li className="list-inline-item">
              <a href="#">About</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Terms</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
          <p className="copyright">Shoppera © 2022</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
