import React from "react";
import freezeIcon from "../../assets/Freeze-card.png";

interface FreezeToggleButtonProps {
  isFrozen: boolean;
  onToggleFreeze: (frozen: boolean) => void;
}

const FreezeToggleButton: React.FC<FreezeToggleButtonProps> = ({
  isFrozen,
  onToggleFreeze,
}) => {
  const handleClick = () => {
    onToggleFreeze(!isFrozen);
  };

  return (
    <button onClick={handleClick}>
      <img src={freezeIcon} alt="Freeze Icon" />
      <br />
      {isFrozen ? "Unfreeze" : "Freeze"} <br />
      card
    </button>
  );
};

export default FreezeToggleButton;
