"use client"
import { useEffect, useState } from "react";
import Body from "../Layout/body";
import { useProduct } from "../../Context/Products/productContext";
import Product from "../Products/product";

export default function Home() {

    const { product } = useProduct();

    useEffect(() => {
    }, [product]);


    return (
        <Body>
            <h1>Productos Destacados</h1>
            <div id="section--product">
                {
                    product.map(prd => {
                        if (prd.highlights) {
                            return <Product product={prd} />
                        }
                        else {
                            return <></>
                        }
                    })
                }
            </div>
        </Body>
    );
}