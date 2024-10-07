import { Cloudinary } from "@cloudinary/url-gen/index";
import { useEffect, useState } from "react";
import { useSettings } from "../../Context/Settings/settingsContext";

const { getMonoColor, getNameColorARGB } = require('adaptive-color');

export default function Product({ product }) {

    const [url, setUrl] = useState();

    const { colorButton } = useSettings();


    const cld = new Cloudinary({
        cloud: {
            cloudName: "dkart8ohp",
        },
    });

    useEffect(() => {
        getImage();
    }, []);



    const getImage = async () => {

        const data = cld
            .image(product.image_id);
        // console.log(data.toURL())

        const image = data.toURL();
        const response = await fetch(image);
        const blob = await response.blob();
        const urlNew = URL.createObjectURL(blob);
        setUrl(urlNew);
    }

    return (
        <div id="product--container">
            <div>
                <img
                    src={url}
                    width={200}
                    height={180}
                    alt={"Image for "+product.name}
                />
            </div>
            <div>
                {product.name}
            </div>
            <div>
                ${product.price}
            </div>
            <div style={{
                marginBottom:"8px"
            }}>
                <button style={{
                    color: getMonoColor(getNameColorARGB(colorButton)),
                    background: colorButton
                }}>Añadir al carrito</button>
            </div>
        </div>
    )
}