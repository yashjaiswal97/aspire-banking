import React, { useEffect, useState } from "react";
import "../styles/CardSection.css";
import eyeIcon from "../assets/eye.png";
import spendLimitIcon from "../assets/Set-spend-limit.png";
import gpayIcon from "../assets/GPay.png";
import replaceIcon from "../assets/Replace-card.png";
import cancelIcon from "../assets/Deactivate-card.png";
import addCardBtn from "../assets/box.png";
import CardCarousel from "../components/CardCarousel/CardCarousel";
import DropdownSection from "../components/DropDown/DropdownSection";
import TransactionsList from "../components/DropDown/TransactionsList";
import FreezeToggleButton from "../components/FreezeToggleButton/FreezeToggleButton";
import { Card, getCards } from "../services/cardService";

const cleanLocalStorageCards = () => {
    const raw = localStorage.getItem("localCards");
    if (!raw) return;
  
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        localStorage.removeItem("localCards");
        return;
      }
  
      const cleaned = parsed.filter(
        (c) =>
          c &&
          typeof c === 'object' &&
          typeof c.name === 'string' &&
          c.name.trim() !== '' &&
          typeof c.id === 'string' &&
          c.id.trim() !== '' &&
          typeof c.last4 === 'string' &&
          typeof c.expiry === 'string'
      );
  
      if (cleaned.length !== parsed.length) {
        console.warn("🧹 Cleaned invalid cards from localStorage");
        localStorage.setItem("localCards", JSON.stringify(cleaned));
      }
    } catch (e) {
      console.error("💥 Failed to parse localStorage['localCards'], resetting it.");
      localStorage.removeItem("localCards");
    }
  };
  

const CardSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardNameInput, setCardNameInput] = useState("");
  const [error, setError] = useState("");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    if (cards.length > 0 && activeCardIndex === -1) {
      setActiveCardIndex(0);
    }
  }, [cards]);
  const handleCardChange = (card: Card, index: number) => {
    setActiveCardIndex(index);
  };

  const toggleFreeze = (isFrozen: boolean) => {
    if (
      activeCardIndex === -1 ||
      activeCardIndex >= cards.length ||
      !cards[activeCardIndex]
    ) {
      console.warn("Invalid activeCardIndex:", activeCardIndex);
      return;
    }

    const updatedCards = [...cards];
    const cardToUpdate = { ...updatedCards[activeCardIndex] }; // make a copy

    cardToUpdate.frozen = isFrozen;
    updatedCards[activeCardIndex] = cardToUpdate;

    setCards(updatedCards);

    // Save to localStorage
    const localCards = JSON.parse(localStorage.getItem("localCards") || "[]");
    const cardIndexInLocal = localCards.findIndex(
      (c: Card) => c.id === cardToUpdate.id
    );

    if (cardIndexInLocal !== -1) {
      localCards[cardIndexInLocal].frozen = isFrozen;
    } else {
      localCards.push({ id: cardToUpdate.id, frozen: isFrozen });
    }

    localStorage.setItem("localCards", JSON.stringify(localCards));
  };

  const handleAddCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCardNameInput("");
    setIsModalOpen(false);
  };

  const handleSaveCard = () => {
    const trimmedName = cardNameInput.trim();

    if (!trimmedName) {
      setError("Cardholder name is required");
      return;
    }

    if (/^\d+$/.test(trimmedName)) {
      setError("Name cannot be only numbers");
      return;
    }

    const last4 =
      (Math.random() + "").substring(2, 10) +
      (Math.random() + "").substring(2, 10);
    const expiry =
      `${String(Math.floor(Math.random() * 12 + 1)).padStart(2, "0")}/` +
      (2025 + Math.floor(Math.random() * 5)).toString().slice(2);

    const newCard = {
      id: Date.now().toString(), // make sure every card has a unique ID
      name: trimmedName,
      last4,
      expiry,
      frozen: false,
    };

    const existingCards = JSON.parse(
      localStorage.getItem("localCards") || "[]"
    );
    const updatedCards = [...existingCards, newCard];

    localStorage.setItem("localCards", JSON.stringify(updatedCards));

    // 👇 Trigger UI update
    window.dispatchEvent(new Event("cardListUpdated"));

    // 👇 Clear state & close modal
    setCardNameInput("");
    setError("");
    handleCloseModal();
  };
  const loadCards = async () => {
    let localCards: Card[] = JSON.parse(
      localStorage.getItem("localCards") || "[]"
    );

    // ✅ Clean corrupted or empty entries
    localCards = localCards.filter(
      (c) => c && typeof c.name === "string" && c.name.trim() !== ""
    );

    const apiCards = await getCards();

    const localMap = new Map(localCards.map((c: Card) => [c.id, c]));
    const merged = apiCards.map((apiCard) => {
      const local = localMap.get(apiCard.id);
      return local ? { ...apiCard, ...local } : apiCard;
    });

    const localOnly = localCards.filter(
      (lc: Card) => !apiCards.find((ac: Card) => ac.id === lc.id)
    );

    const combined = [...merged, ...localOnly];

    setCards(combined);
  };

  useEffect(() => {
    cleanLocalStorageCards(); 
    loadCards();
  }, []);

  useEffect(() => {
    const handleCardListUpdate = () => {
      loadCards(); // 🔁 reload updated card list from localStorage + API
    };

    window.addEventListener("cardListUpdated", handleCardListUpdate);

    return () => {
      window.removeEventListener("cardListUpdated", handleCardListUpdate);
    };
  }, []);

  return (
    <div className="card-container">
      <div className="top-section">
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Add New Card</h2>
              <input
                type="text"
                value={cardNameInput}
                placeholder="Enter cardholder name"
                className={`modal-input ${error ? "input-error" : ""}`}
                onChange={(e) => {
                  setCardNameInput(e.target.value);
                  if (error) setError("");
                }}
              />
              {error && <p className="error-text">{error}</p>}

              <div className="modal-actions">
                <button onClick={handleSaveCard} className="add-btn">
                  Add Card
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <p className="label">Available balance</p>
        <div className="top-section-inner">
          <div className="amount">
            <div className="currency">S$</div> 3,000
          </div>
          <button className="add-card-btn" onClick={handleAddCardClick}>
            <img
              src={addCardBtn}
              alt="Add Card Button"
              className="add-card-btn-icon"
            />{" "}
            New card
          </button>
        </div>
      </div>

      <div className="tabs">
        <span className="active-tab">My debit cards</span>
        <span className="inactive-tab">All company cards</span>
      </div>

        <div className="card-info-box">
            <div className="card-left">
            <button className="show-card">
                <img src={eyeIcon} alt="Show Icon" />
                <span>Show card number</span>
            </button>

            <CardCarousel
                cards={cards}
                activeIndex={activeCardIndex}
                onActiveCardChange={handleCardChange}
            />
            <div className="card-actions">
                <div className="action">
                <FreezeToggleButton
                    key={cards[activeCardIndex]?.id} // force reset on card switch
                    isFrozen={cards[activeCardIndex]?.frozen || false}
                    onToggleFreeze={toggleFreeze}
                />
                </div>
                <div className="action">
                <button>
                    <img src={spendLimitIcon} alt="" />
                    <p>
                    Set spend <br></br> limit
                    </p>
                </button>
                </div>
                <div className="action">
                <button>
                    <img src={gpayIcon} alt="" />
                    <p>
                    Add to <br /> GPay
                    </p>
                </button>
                </div>
                <div className="action">
                <button>
                    <img src={replaceIcon} alt="" />
                    <p>
                    Replace <br />
                    card
                    </p>
                </button>
                </div>
                <div className="action">
                <button>
                    <img src={cancelIcon} alt="" />
                    <p>
                    Cancel <br />
                    card
                    </p>
                </button>
                </div>
            </div>
            </div>

        <div className="card-right">
          <DropdownSection title="Card details" defaultOpen={false}>
            {}
          </DropdownSection>
          <DropdownSection title="Recent transactions" defaultOpen={true}>
            <TransactionsList />
          </DropdownSection>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
