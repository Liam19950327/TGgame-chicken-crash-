import React, { useContext } from 'react'
import './index.css'
import logo from "../../../../assets/logo.png"
import { GlobalContext } from '../../../../context'

const Crash = () => {
    const { risk, setRisk, betAmount, setBetAmount, currentIndex, setCurrentIndex, levelArrays, setBalance, balance } = useContext(GlobalContext);

    const handlePlayButton = () => {
        setCurrentIndex(0);
    }

    const roundToTwo = (num) => {
        return Math.round((Number(num) + Number.EPSILON) * 100) / 100;
    }

    const clampAndFormat = (value) => {
        let num = typeof value === 'string' ? parseFloat(value) : value;
        if (Number.isNaN(num)) num = 0;
        num = roundToTwo(num); // at most 2 decimals
        if (num < 1) num = 1;
        if (num > 200) num = 200;
        return num;
    }

    const handleBetAmount = (multiple) => {
        setBetAmount(clampAndFormat(Number(betAmount) * multiple))
    }

    const currentMultiplier = currentIndex >= 0 ? levelArrays[currentIndex] : 0;
    const earnMoney = roundToTwo(Number(betAmount) * Number(currentMultiplier));


    return (
        <div className='crash'>
            <img src={logo} alt="" />
            <div className='crash-section'>
                <div>
                    <div className="bet-amount-wrapper">
                        <span className='inner-title'>BET AMOUNT</span>
                        <div className="bet-ui">
                            <span>$</span>
                            <input
                                type="text"
                                className='custom-keyboard-input'
                                value={betAmount}
                                onChange={(e) => setBetAmount(clampAndFormat(e.target.value))}
                            />
                            <button onClick={() => handleBetAmount(1 / 2)}>1/2</button>
                            <button onClick={() => handleBetAmount(2)}>x2</button>
                            <button onClick={() => setBetAmount(200)}>Max</button>
                        </div>
                    </div>
                    <div className="risk-selector-container">
                        <span className='inner-title'>RISK</span>
                        <div className="risk-selector">
                            <button
                                className={`risk-btn low ${risk === 0 ? 'selected' : ''}`}
                                onClick={() => setRisk(0)}
                            >
                                LOW
                            </button>
                            <button
                                className={`risk-btn medium ${risk === 1 ? 'selected' : ''}`}
                                onClick={() => setRisk(1)}
                            >
                                MEDIUM
                            </button>
                            <button
                                className={`risk-btn high ${risk === 2 ? 'selected' : ''}`}
                                onClick={() => setRisk(2)}
                            >
                                HIGH
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        currentIndex === -1
                            ?
                            <button className='bet-button' onClick={() => handlePlayButton()}>PLAY</button>
                            :
                            <>
                                <button className='bet-button' onClick={() => setCurrentIndex(currentIndex + 1)}>GO</button>
                                <button className='bet-button  cash-out-button'
                                    onClick={() => {
                                        setBalance(roundToTwo(Number(balance) + Number(earnMoney)));
                                        setCurrentIndex(-1);
                                    }}
                                >
                                    <div>CASH OUT</div>
                                    <div>$ {earnMoney.toFixed(2)}</div>
                                </button>
                            </>
                    }
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