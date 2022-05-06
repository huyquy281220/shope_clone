import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import numberWithCommas from "../../../utils/formatPrice/numberWithCommas";

function TodaySuggestion() {
    const navigate = useNavigate();
    const [suggestProduct, setSuggestProduct] = useState({
        limit: 5,
        skip: 0,
    });
    const [productToday, setProductToday] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    console.log(productToday);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/products?${queryString.stringify(suggestProduct)}`
            )
            .then((res) => setProductToday(res.data))
            .catch((err) => console.error(err));
    }, [suggestProduct]);

    const handleProduct = (id) => {
        navigate(`/product/details/${id}`, { state: productToday[id - 1] });
    };

    const handleLimit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setSuggestProduct({
                ...suggestProduct,
                skip: suggestProduct.skip + 5,
            });
            setIsLoading(false);
        },2000);
    };
    console.log(queryString.stringify(suggestProduct));

    return (
        <div className="products-today">
            <div className="suggest__header">
                <Link to="">Gợi ý hôm nay</Link>
            </div>
            <div className="suggest__body-content">
                <div className="today-items">
                    {productToday.map((product, key) => (
                        <div
                            className="today-item item-scale"
                            onClick={() => handleProduct(product._id)}
                            key={key}
                        >
                            <div className="item-image">
                                <img src={product.image} alt="" />
                            </div>
                            <div className="item-desc">{product.desc}</div>
                            <div className="item-price">
                                <span>₫</span>
                                {numberWithCommas(product.price)}
                            </div>
                        </div>
                    ))}
                    {isLoading &&
                        Array(5)
                            .fill()
                            .map((key) => (
                                <div className="today-item" key={key}>
                                    <div
                                        className="item-image skeleton-box"
                                        style={{ height: "188px" }}
                                    ></div>
                                    <div
                                        className="item-desc skeleton-box"
                                        style={{ height: "28px" }}
                                    ></div>
                                    <div
                                        className="item-price skeleton-box"
                                        style={{ height: "24px" }}
                                    ></div>
                                </div>
                            ))}
                    <button className="btn btn-light" onClick={() => handleLimit()}>
                        Xem Thêm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodaySuggestion;
