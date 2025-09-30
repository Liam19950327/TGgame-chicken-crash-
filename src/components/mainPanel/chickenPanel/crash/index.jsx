import React from 'react'
import './index.css'
import logo from "../../../../assets/logo.png"

const Crash = () => {
    return (
        <div className='crash'>
            <img src={logo} alt="" />
            <div className='crash-section'>
                <div>
                    <div className="bet-amount-wrapper">
                        <span className='inner-title'>BET AMOUNT</span>
                        <div className="bet-ui">
                            <span>$</span>
                            <input type="text" className='custom-keyboard-input' value={2} />
                            <button>1/2</button>
                            <button>x2</button>
                            <button>Max</button>
                        </div>
                    </div>
                    <div className="risk-selector-container">
                        <span className='inner-title'>RISK</span>
                        <div className="risk-selector">
                            <button className='risk-btn low'>LOW</button>
                            <button className='risk-btn medium selected'>MEDIUM</button>
                            <button className='risk-btn high'>HIGH</button>
                        </div>
                    </div>
                </div>
                <div>
                    <button className='bet-button'>PLAY</button>
                </div>
            </div>
            <div className='BettingSectionFooterWrapper'>
                <div className="BettingSectionFooterWrapperPart1">
                    <p className='icon active'>1</p>
                    <p className='icon'>1</p>
                    <p className='icon'>1</p>
                </div>
                <div className="BettingSectionFooterWrapperPart2">
                    <p className='icon  disabled'>1</p>
                </div>
            </div>
        </div>
    )
}

export default Crash