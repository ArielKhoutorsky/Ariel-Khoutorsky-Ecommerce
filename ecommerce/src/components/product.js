import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  return (
    // <Card>
    //   <Link to={`/product/${product.slug}`}>
    //     <img className="card-img-top" src={product.image} alt={product.name} />
    //   </Link>
    //   <Card.Body>
    //     <Link to={`/product/${product.slug}`}>
    //       <Card.Title>{product.name}</Card.Title>
    //     </Link>
    //     <Rating
    //       rating={product.rating}
    //       numReviews={product.numReviews}
    //     ></Rating>
    //     <Card.Text>${product.price}</Card.Text>
    //     {product.countInStock === 0 ? (
    //       <Button variant="light" disabled>
    //         Out of stock
    //       </Button>
    //     ) : (
    //       <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
    //     )}
    //   </Card.Body>
    // </Card>
    <div className="item">
      <div className="img-box">
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>
      <div className="details">
        <h2>
          {product.name}
          <br />
          <span>{product.category}</span>
        </h2>
        <div className="price">${product.price}</div>
        <label>Size</label>
        <ul>
          <li>Small</li>
          <li>Medium</li>
          <li>Large</li>
        </ul>
        <label>Color</label>
        <ul className="colors">
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <br></br>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            className="btn-product btn btn-2 btn-sep icon-cart"
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
}

export default Product;
