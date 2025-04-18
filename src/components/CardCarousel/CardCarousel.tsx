import React, { useEffect, useState, useRef } from "react";
import "./CardCarousel.css";
import { getCards, Card } from "../../services/cardService";
import aspireLogoWhite from "../../assets/Aspire-Logo-1.png";
import visaLogo from "../../assets/Visa-Logo.png";

interface CardCarouselProps {
  cards: Card[];
  activeIndex: number;
  onActiveCardChange?: (card: Card, index: number) => void;
}
const CardCarousel: React.FC<CardCarouselProps> = ({
  cards,
  activeIndex,
  onActiveCardChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, offsetWidth } = containerRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      if (onActiveCardChange && cards[index]) {
        onActiveCardChange(cards[index], index);
      }
    }
  };

  return (
    <>
      <div
        className="carousel-container"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="credit-card"
            style={{
              opacity: card.frozen ? 0.5 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
            <div className="card-top">
              <img
                src={aspireLogoWhite}
                alt="Aspire Logo"
                className="aspire-logo"
              />
            </div>

            <div className="card-body">
              <div className="card-name">{card.name}</div>
              <div className="card-dots">
                •••• •••• •••• {card.last4?.slice(-4) || "0000"}
              </div>
              <div className="card-details">
                <div className="expiry">Thru: {card.expiry}</div>
                <div className="cvv">CVV: ***</div>
              </div>
            </div>

            <div className="card-bottom">
              <img src={visaLogo} alt="Visa Logo" className="visa-logo" />
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-indicators">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === activeIndex ? "active" : ""}`}
          />
        ))}
      </div>
    </>
  );
};

export default CardCarousel;
