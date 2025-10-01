import React, { useEffect, useRef, useState } from "react";
import "./loads.css"
import coin from "../../../assets/coin/coin.webp"
import dottedLine from "../../../assets/street/dotted-line.webp"
import shine from "../../../assets/coin/shine.webp"
import goldCoin from "../../../assets/coin/golden-coin.webp"
import loadblocks from "../../../assets/chicken/loadblocks.svg"

const Loads = ({ eachValue, index, original, currentIndex, shouldAnimate, setCurrentIndex }) => {
    const shineRef = useRef(null);
    const [shinePosition, setShinePosition] = useState(-41);
    const [bouncePosition, setBouncePosition] = useState(0);
    const [bounceScale, setBounceScale] = useState(1);
    const [bounceRotation, setBounceRotation] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [movementCompleted, setMovementCompleted] = useState(false);
    const [shouldBounce, setShouldBounce] = useState(false);
    const isCoinPosition = index <= currentIndex;

    useEffect(() => {
        if (!shouldAnimate || !shineRef.current) return;

        const startPosition = -41;
        const endPosition = 135;
        const duration = 2000; // 2 seconds
        let animationId;

        const animate = () => {
            // Initialize global animation start time if not set
            if (!window.globalShineStartTime) {
                window.globalShineStartTime = Date.now();
            }

            const animateFrame = () => {
                const elapsed = Date.now() - window.globalShineStartTime;
                const progress = (elapsed % (duration + 100)) / duration; // Loop every 2.1 seconds
                const clampedProgress = Math.min(progress, 1);

                // Ease-in-out function
                const easeInOut = clampedProgress < 0.5
                    ? 2 * clampedProgress * clampedProgress
                    : 1 - Math.pow(-2 * clampedProgress + 2, 2) / 2;

                const currentPosition = startPosition + (endPosition - startPosition) * easeInOut;
                setShinePosition(currentPosition);

                if (shouldAnimate) {
                    animationId = requestAnimationFrame(animateFrame);
                }
            };

            animateFrame();
        };

        animate();

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [shouldAnimate]);

    // Bounce animation for golden coins when they should bounce
    useEffect(() => {
        if (!shouldBounce || hasAnimated) return;

        const bounceDuration = 600; // 0.6 seconds
        const bounceHeight = -50; // pixels up (increased from -30)
        const startTime = Date.now();
        let bounceAnimationId;

        const animateBounce = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / bounceDuration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 3);

            const bounceValue = bounceHeight * Math.sin(progress * Math.PI) * easeOut;
            setBouncePosition(bounceValue);

            const scaleValue = 1 - (0.4 * Math.sin(progress * Math.PI));
            setBounceScale(scaleValue);

            const rotationValue = 45 * Math.sin(progress * Math.PI);
            setBounceRotation(rotationValue);

            if (progress < 1) {
                bounceAnimationId = requestAnimationFrame(animateBounce);
            } else {
                setHasAnimated(true);
            }
        };

        animateBounce();

        return () => {
            if (bounceAnimationId) {
                cancelAnimationFrame(bounceAnimationId);
            }
        };
    }, [shouldBounce, hasAnimated]);

    // Listen for global arrival event to trigger previous coin bounce after chicken arrives
    useEffect(() => {
        const handleArrival = (e) => {
            const arrivedIndex = e?.detail?.index;
            if (typeof arrivedIndex === 'number' && index === arrivedIndex - 1) {
                setShouldBounce(true);
            }
        };
        window.addEventListener('chicken-arrived', handleArrival);
        return () => window.removeEventListener('chicken-arrived', handleArrival);
    }, [index]);

    // Reset movementCompleted whenever the current index changes context for this coin
    useEffect(() => {
        if (index === currentIndex) {
            setMovementCompleted(false);
        } else {
            setMovementCompleted(false);
        }
    }, [index, currentIndex]);

    const handleCoinClick = () => {
        if (index === currentIndex + 1) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    return (
        <div className="loads" aria-disabled>
            <div className="coin" aria-disabled>
                <div className={index < currentIndex ? "gold-coin" : "coin-img"} style={{ cursor: index === currentIndex + 1 ? "pointer" : "default" }} onClick={() => handleCoinClick()}>
                    {(() => {
                        if (index === currentIndex) {
                            // While moving to this index, keep showing the normal coin; hide after arrival
                            return movementCompleted ? null : <img src={coin} alt="" aria-disabled />;
                        }
                        return index < currentIndex ? (
                            <img className="gold-coin" src={goldCoin} alt="" aria-disabled />
                        ) : (
                            <img src={coin} alt="" aria-disabled />
                        );
                    })()}
                    {index !== currentIndex && shouldAnimate && (
                        <img
                            ref={shineRef}
                            className="shine"
                            src={shine}
                            alt="This is shine effect"
                            aria-disabled
                            style={{ left: `${shinePosition}px` }}
                        />
                    )}
                    <div className="coin-border"></div>
                </div>
                {(() => {
                    // Match label visibility with coin visibility timing
                    if (index === currentIndex) {
                        return movementCompleted ? null : (
                            <p style={{ cursor: index === currentIndex + 1 ? "pointer" : "default" }} onClick={() => handleCoinClick()}>
                                {eachValue}
                            </p>
                        );
                    }
                    return index < currentIndex ? null : (
                        <p style={{ cursor: index === currentIndex + 1 ? "pointer" : "default" }} onClick={() => handleCoinClick()}>
                            {eachValue}
                        </p>
                    );
                })()}
            </div>
            <div className="line" aria-disabled>
                {index !== (original.length - 1) && <img src={dottedLine} alt="" aria-disabled />}
            </div>

            <div className="load-blocks">
                {index <= currentIndex && (
                    <img
                        src={loadblocks}
                        alt="This is load blocks"
                        aria-disabled
                        className={index === currentIndex ? 'animate' : ''}
                        onAnimationEnd={() => {
                            if (index === currentIndex) {
                                setMovementCompleted(true);
                                try {
                                    const event = new CustomEvent('chicken-arrived', { detail: { index: currentIndex } });
                                    window.dispatchEvent(event);
                                } catch (e) {
                                }
                            }
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default Loads