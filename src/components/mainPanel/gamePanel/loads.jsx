import React from "react";
import "./loads.css"
import coin from "../../../assets/coin/coin.webp"
import dottedLine from "../../../assets/street/dotted-line.webp"

const Loads = ({ eachValue, index, original }) => {

    return (
        <div className="loads" aria-disabled>
            <div className="coin" aria-disabled>
                <img src={coin} alt="" aria-disabled />
                <p aria-disabled>{eachValue}</p>
            </div>
            <div className="line" aria-disabled>
                {index !== (original.length - 1) && <img src={dottedLine} alt="" aria-disabled />}
            </div>
        </div>
    )
}

export default Loads