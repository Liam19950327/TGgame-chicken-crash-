import React, { useContext, useEffect, useRef, useState } from 'react'
import './index.css'
import Loads from './loads'
import { GlobalContext } from '../../../context'
import chickenFoot from "../../../assets/chicken/chicken-foot.webp"
import chickenBody from "../../../assets/chicken/chicken-body.webp"
import moveAudio from "../../../assets/music/car-win.mp3"
import winModal from "../../../assets/chicken/win-modal.webp"
import winModalParticles from "../../../assets/chicken/win-modal-particles.webp"

const GamePanel = () => {
    const { levelArrays, currentIndex, setCurrentIndex, modalState, setModalState, earnMoney, isChickenMoving, setIsChickenMoving } = useContext(GlobalContext);
    const containerRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const dragStateRef = useRef({ startX: 0, scrollLeft: 0 })
    const moveTimeoutRef = useRef(null)
    const moveAudioRef = useRef(null)
    const [showModal, setShowModal] = useState(false)
    const [particlesAnimating, setParticlesAnimating] = useState(false)
    const [pendingIndexReset, setPendingIndexReset] = useState(false)

    useEffect(() => {
        const chickenEl = document.getElementsByClassName("chicken")[0]
        if (!chickenEl) return

        if (currentIndex === 0) {
            chickenEl.style.left = "167px"
        }
        if (currentIndex !== -1)
            chickenEl.style.left = (167 + currentIndex * 165) + "px"
        if (currentIndex === -1) {
            chickenEl.style.left = "0px"
        }

        // Add moving class for foot step animation and set global moving state
        if (currentIndex !== -1) {
            chickenEl.classList.add('moving')
            setIsChickenMoving(true)
        }
        if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current)
        moveTimeoutRef.current = setTimeout(() => {
            chickenEl.classList.remove('moving')
            setTimeout(() => {
                setIsChickenMoving(false);
            }, 500);
        }, 320)

        // Play movement sound when chicken moves to a valid index
        if (currentIndex !== -1 && moveAudioRef.current) {
            try {
                moveAudioRef.current.volume = 0.6
                moveAudioRef.current.currentTime = 0
                void moveAudioRef.current.play().catch(() => { })
            } catch (e) {
            }
        }
    }, [currentIndex])

    // Handle win modal animation sequence
    useEffect(() => {
        if (!modalState) {
            // Show modal when modalState becomes false (cash-out clicked)
            setShowModal(true)
            setParticlesAnimating(false)
            setPendingIndexReset(true) // Mark that we need to reset index after animation

            // Start particle animation after a brief delay
            setTimeout(() => {
                setParticlesAnimating(true)
            }, 100)

            // Trigger chicken movement after particles finish (1s)
            setTimeout(() => {
                // Dispatch chicken-arrived event to trigger previous coin animation and panel scroll
                try {
                    const event = new CustomEvent('chicken-arrived', { detail: { index: currentIndex } });
                    window.dispatchEvent(event);
                } catch (e) {
                }

                // Reset currentIndex after chicken movement is triggered
                if (pendingIndexReset) {
                    setCurrentIndex(-1)
                    setPendingIndexReset(false)
                }
            }, 1000) // 100ms delay + 1000ms particle animation

            // Hide modal after particles finish (1s) + fade duration (1s) = 2s total
            setTimeout(() => {
                setShowModal(false)
                setParticlesAnimating(false)
                setModalState(true) // Reset modal state
            }, 1000)
        }
    }, [modalState, setModalState, currentIndex, pendingIndexReset, setCurrentIndex])

    useEffect(() => {
        if (currentIndex === -1) containerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        const handleArrival = (e) => {
            const arrivedIndex = e?.detail?.index
            if (!containerRef.current || typeof arrivedIndex !== 'number' || arrivedIndex < 0) return
            try {
                containerRef.current.scrollTo({ left: arrivedIndex * 165, behavior: 'smooth' })
            } catch (err) {
            }
        }
        window.addEventListener('chicken-arrived', handleArrival)
        return () => window.removeEventListener('chicken-arrived', handleArrival)
    }, [currentIndex])

    const onMouseDown = (e) => {
        if (!containerRef.current) return
        setIsDragging(true)
        containerRef.current.classList.add('dragging')
        dragStateRef.current = {
            startX: e.pageX - containerRef.current.offsetLeft,
            scrollLeft: containerRef.current.scrollLeft,
        }
    }

    const onMouseMove = (e) => {
        if (!isDragging || !containerRef.current) return
        const x = e.pageX - containerRef.current.offsetLeft
        const walk = (x - dragStateRef.current.startX) * 1
        containerRef.current.scrollLeft = dragStateRef.current.scrollLeft - walk
    }

    const endDrag = () => {
        if (!containerRef.current) return
        setIsDragging(false)
        containerRef.current.classList.remove('dragging')
    }

    const onTouchStart = (e) => {
        if (!containerRef.current) return
        setIsDragging(true)
        containerRef.current.classList.add('dragging')
        const touch = e.touches[0]
        dragStateRef.current = {
            startX: touch.pageX - containerRef.current.offsetLeft,
            scrollLeft: containerRef.current.scrollLeft,
        }
    }

    const onTouchMove = (e) => {
        if (!isDragging || !containerRef.current) return
        const touch = e.touches[0]
        const x = touch.pageX - containerRef.current.offsetLeft
        const walk = (x - dragStateRef.current.startX) * 1
        containerRef.current.scrollLeft = dragStateRef.current.scrollLeft - walk
    }

    return (
        <div
            className='game-panel'
            ref={containerRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={endDrag}
        >
            <audio src={moveAudio} ref={moveAudioRef} preload="auto" />
            <div className="street-start" aria-disabled>
            </div>
            <div className="main-street" aria-disabled>
                {levelArrays.map((eachValue, index, original) => {
                    const shouldAnimate = index <= currentIndex + 1;
                    return (
                        <div key={index}>
                            <Loads
                                eachValue={eachValue}
                                index={index}
                                original={original}
                                currentIndex={currentIndex}
                                setCurrentIndex={setCurrentIndex}
                                shouldAnimate={shouldAnimate}
                                isChickenMoving={isChickenMoving}
                            />
                        </div>
                    )
                })}
            </div>
            <div className="street-end" aria-disabled>
            </div>
            <div className="chicken" aria-disabled>
                <div className="chicken-property">
                    <img className='chicken-body' src={chickenBody} alt="This is chicken body" aria-disabled />
                    <img className='chicken-foot-front' src={chickenFoot} alt="This is chicken leg-1" aria-disabled />
                    <img className='chicken-foot-back' src={chickenFoot} alt="This is chicken leg-2" aria-disabled />
                </div>
            </div>
            {showModal && (
                <div
                    className="win-modal"
                    style={{
                        left: currentIndex !== -1 ? `${314 + 165 * (currentIndex)}px` : '314px'
                    }}
                >
                    <img src={winModal} alt="" className="win-modal-bg" />
                    <div className="win-modal-content">
                        <div className="win-amount">${earnMoney}</div>
                    </div>
                    <img
                        src={winModalParticles}
                        alt=""
                        className={`win-modal-particles ${particlesAnimating ? 'particles-falling' : ''}`}
                    />
                </div>
            )}
        </div>
    )
}

export default GamePanel