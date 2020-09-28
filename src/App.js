// Feature 1

import React from "react";
import data from "./data.json";
import { render } from "@testing-library/react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItem")
        ? JSON.parse(localStorage.getItem("cartItem"))
        : [],
      size: "",
      sort: "",
    };
  }

  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState({
      sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    });
  };

  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        products: data.products,
      });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter((product) => {
          return product.availableSizes.indexOf(event.target.value) >= 0;
        }),
      });
    }
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice(); //clone
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });

    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }

    this.setState({
      cartItems,
    });
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice(); //clone
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });

    localStorage.setItem(
      "cartItem",
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
  };

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                ></Filter>
                <Products
                  products={this.state.products}
                  addToCart={this.addToCart}
                ></Products>
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                ></Cart>
              </div>
            </div>
          </main>
          <footer>All rights are reserved</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
