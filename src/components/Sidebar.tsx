import "../styles/Sidebar.css";
import logo from "../assets/aspire-logo.png";
import homeIcon from "../assets/icons/Home.png";
import cardsIcon from "../assets/icons/Card.png";
import paymentsIcon from "../assets/icons/Payments.png";
import creditIcon from "../assets/icons/Credit.png";
import settingsIcon from "../assets/icons/Account.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={logo} alt="Aspire Logo" className="logo" />
      <p className="tagline">
        Trusted way of banking for 3,000+ SMEs and startups in Singapore
      </p>
      <nav className="menu">
        <div className="menu-item">
          <img src={homeIcon} alt="Home" />
          <span>Home</span>
        </div>
        <div className="menu-item active">
          <img src={cardsIcon} alt="Cards" />
          <span>Cards</span>
        </div>
        <div className="menu-item">
          <img src={paymentsIcon} alt="Payments" />
          <span>Payments</span>
        </div>
        <div className="menu-item">
          <img src={creditIcon} alt="Credit" />
          <span>Credit</span>
        </div>
        <div className="menu-item">
          <img src={settingsIcon} alt="Settings" />
          <span>Settings</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
