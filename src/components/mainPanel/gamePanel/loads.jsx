import React from "react";
import "./loads.css"
import coin from "../../../assets/coin/coin.webp"
import dottedLine from "../../../assets/street/dotted-line.webp"

const Loads = ({ eachValue }) => {

    return (
        <div className="loads">
            <div className="coin">
                <img src={coin} alt="" />
            </div>
            <div className="line">
                <img src={dottedLine} alt="" />
            </div>
        </div>
    )
}

export default Loads