import React, { createContext, useEffect, useState } from "react";
import { highLevel, lowLevel, mediumLevel } from "../script/level";

export const GlobalContext = createContext({
    balance: 100000,
    risk: 1,
    betAmount: 2,
    levelArrays: mediumLevel,
    currentIndex: -1,
    earnMoney: 0
});

const Provider = ({ children }) => {
    const [balance, setBalance] = useState(100000);
    const [risk, setRisk] = useState(1);
    const [betAmount, setBetAmount] = useState(2);
    const [levelArrays, setLevelArrays] = useState(mediumLevel);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [modalState, setModalState] = useState(true);
    const [earnMoney, setEarnMoney] = useState(0);
    const [isChickenMoving, setIsChickenMoving] = useState(false);

    const roundToTwo = (num) => {
        return Math.floor((Number(num) + Number.EPSILON) * 100) / 100;
    }

    useEffect(() => {
        if (risk === 0) setLevelArrays(lowLevel);
        if (risk === 1) setLevelArrays(mediumLevel);
        if (risk === 2) setLevelArrays(highLevel);
    }, [risk]);

    useEffect(() => {
        const currentMultiplier = currentIndex >= 0 ? levelArrays[currentIndex] : 0;
        const calculatedEarnMoney = roundToTwo(Number(betAmount) * Number(currentMultiplier));
        setEarnMoney(calculatedEarnMoney);
    }, [betAmount, currentIndex, levelArrays]);

    return (
        <GlobalContext.Provider
            value={{
                balance,
                setBalance,
                risk,
                setRisk,
                betAmount,
                setBetAmount,
                levelArrays,
                currentIndex,
                setCurrentIndex,
                modalState,
                setModalState,
                earnMoney,
                setEarnMoney,
                isChickenMoving,
                setIsChickenMoving
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default Provider;


