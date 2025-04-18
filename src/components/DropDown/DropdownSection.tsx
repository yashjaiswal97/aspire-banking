import React, { useState, ReactNode } from "react";
import "./DropdownSection.css";
import downArrow from "../../assets/down-arrow.png";

interface DropdownSectionProps {
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
  defaultOpen?: boolean;
}

const DropdownSection: React.FC<DropdownSectionProps> = ({
  title,
  icon,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="dropdown-section">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {icon && <span className="icon">{icon}</span>}
        <h3>{title}</h3>
        <span className={`arrow ${isOpen ? "up" : "down"}`}>
          <img
            src={downArrow}
            alt="Down arrow Button"
            className="downArrow-img"
          />
        </span>
      </div>
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
};

export default DropdownSection;
