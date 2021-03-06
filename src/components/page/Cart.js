import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as CartEmpty } from "../../assets/svg/cart-empty.svg";
import { STORAGE_PRODUCTS_CART, BASE_PATH } from "./Constantes";
import { ReactComponent as CartFull } from "../../assets/svg/cart-full.svg";
import { ReactComponent as Garbage } from "../../assets/svg/garbage.svg";
import { ReactComponent as Close } from "../../assets/svg/close.svg";

import {
  removeArrayDuplicates,
  countDuplicatesItemArray,
  removeItemArray,
} from "../../utils/arrayFunc";

import "./Cart.scss";

export default function Cart(props) {
  const { productsCart, getProductsCart, products, addProductCart } = props;
  const [cartOpen, setCartOpen] = useState(false);
  const widthCartContent = cartOpen ? 400 : 0;

  const openCart = () => {
    setCartOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeCart = () => {
    setCartOpen(false);
    document.body.style.overflow = "scroll";
  };

  const emptyCart = () => {
    localStorage.removeItem(STORAGE_PRODUCTS_CART);
    getProductsCart();
  };

  const increaseQuantity = (id) => {
    const arrayItemsCart = productsCart;
    arrayItemsCart.push(id);
    localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemsCart);
    getProductsCart();
  };

  const decreaseQuantity = (id) => {
    const arrayItemsCart = productsCart;
    const result = removeItemArray(arrayItemsCart, id.toString());
    localStorage.setItem(STORAGE_PRODUCTS_CART, result);
    getProductsCart();
  };
  console.log("ultima linea:" + productsCart);

  return (
    <>
      <Button variant="link" className="cart">
        {productsCart.length > 0 ? (
          <CartFull onClick={openCart} />
        ) : (
          <CartEmpty onClick={closeCart} />
        )}
      </Button>

      <div className="cart-content" style={{ width: widthCartContent }}>
        <CartContentHeader closeCart={closeCart} emptyCart={emptyCart} />
        {productsCart.map((product) => (
          <RenderProduct key={product} product={product} />
        ))}
      </div>
    </>
  );
}

function CartContentHeader(props) {
  const { closeCart, emptyCart } = props;

  return (
    <div className="cart-content__header">
      <div>
        <Close onClick={closeCart} />
      </div>

      <Button variant="link" onClick={emptyCart}>
        Vaciar
        <Garbage />
      </Button>
    </div>
  );
}

function CartContentProducts(props) {
  const { product } = props;
  console.log("CartContentProducts" + product);

  return <RenderProduct product={product} />;
}

function RenderProduct(props) {
  const { product } = props;
  console.log(product);

  return (
    <div className="cart-content__product">
      <img
        src={`${BASE_PATH}/img/presupuesto_img/${product.ruta_imagen}`}
        alt={product.nombre_producto}
      />
      <div className="cart-content__product-info">
        <div>
          <h3>{product.nombre_producto}</h3>
          <p>{product.prrecio} ??? / ud.</p>
        </div>
        <div>
          {/* <p>En carri: {quantity} ud.</p> */}
          <div>
            {/* <button onClick={() => increaseQuantity(product.id)}>+</button>
            <button onClick={() => decreaseQuantity(product.id)}>-</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
