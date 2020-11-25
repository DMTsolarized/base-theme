import React, { useState } from "react";
import ProductReviews from "Component/ProductReviews";
import ProductInformation from "Component/ProductInformation";
const Tabs = (props) => {
    const [pointer, setPointer] = useState({
        description: true,
        reviews: false,
        isActive: "About",
    });
    const { dataSource, parameters, areDetailsLoaded } = props;
    const handleClick = (e) => {
        if (e.target.name != "Reviews") {
            if (e.target.name == "About") setPointer({ description: true, reviews: false, isActive: "About" });
            else setPointer({ description: false, reviews: false, isActive: "Details" });
        } else setPointer({ description: false, reviews: true, isActive: "Reviews" });
    };
    return (
        <React.Fragment>
            <div className="ProductPage-Navbar">
                <div
                    name="About"
                    className="Toggler-Wraper"
                    style={{ background: pointer.isActive == "About" ? "var(--secondary-base-color)" : "white" }}
                >
                    <a aria-label="About" name="About" onClick={(e) => handleClick(e)}>
                        About
                    </a>
                </div>
                <div
                    className="Toggler-Wraper"
                    style={{ background: pointer.isActive == "Details" ? "var(--secondary-base-color)" : "white" }}
                >
                    <a aria-label="Details" name="Details" onClick={(e) => handleClick(e)}>
                        Details
                    </a>
                </div>
                <div
                    className="Toggler-Wraper"
                    style={{ background: pointer.isActive == "Reviews" ? "var(--secondary-base-color)" : "white" }}
                >
                    <a aria-label="Reviews" name="Reviews" onClick={(e) => handleClick(e)}>
                        Reviews
                    </a>
                </div>
            </div>
            {!pointer.reviews && (
                <ProductInformation
                    product={{ ...dataSource, parameters }}
                    areDetailsLoaded={areDetailsLoaded}
                    description={pointer.description}
                />
            )}
            {pointer.reviews && <ProductReviews product={dataSource} areDetailsLoaded={areDetailsLoaded} />}
        </React.Fragment>
    );
};
export default Tabs;
