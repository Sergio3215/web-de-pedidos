//productos en jsx
"use client"

import { useProduct } from "../../Context/Products/productContext";
import Body from "../Layout/body";
import Product from "./product";

export default function Products() {

    const { product } = useProduct();

    return (
        <Body>
            <h1>Productos</h1>
            <div id="section--product">
                {
                    product.map(dt => {
                        return <Product product={dt} />
                    })
                }
            </div>
        </Body>
    );
}