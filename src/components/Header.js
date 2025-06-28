import { LOGO_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnNameReact, setbtnNameReact] = useState("login");
  const onlineStatus = useOnlineStatus();
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="header">
      <div className="header-left">
        <div className="Logo-container">
          <img className="Logo" src={LOGO_URL} alt="Restaurant Logo" />
        </div>
        <span className="online-status" title="Online Status">
          {onlineStatus ? "🟢 Online" : "🔴 Offline"}
        </span>
        <label className="theme-switch" title="Toggle dark mode">
          <input
            type="checkbox"
            checked={dark}
            onChange={() => setDark((d) => !d)}
            aria-label="Toggle dark mode"
          />
          <span className="slider">{dark ? "🌙" : "☀️"}</span>
        </label>
      </div>
      <div className="nav-items">
        <ul className="desktop-nav">
          <li className="Link"><a href="/">Home</a></li>
          <li className="Link"><a href="/about">About</a></li>
          <li className="Link"><a href="/contact">Contact Us</a></li>
          <li className="Link"><a href="/Grocery">Grocery</a></li>
          <li className="Link"><a href="/cart">Cart</a></li>
          <li>
            <button
              className="login"
              onClick={() => setbtnNameReact((prev) => prev === "login" ? "logout" : "login")}
            >
              {btnNameReact}
            </button>
          </li>
        </ul>
        {/* Mobile Dropdown */}
        <div className="mobile-dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setDropdownOpen((open) => !open)}
            aria-label="Open menu"
          >
            ☰
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <a href="/" onClick={() => setDropdownOpen(false)}>Home</a>
              <a href="/about" onClick={() => setDropdownOpen(false)}>About</a>
              <a href="/contact" onClick={() => setDropdownOpen(false)}>Contact Us</a>
              <a href="/Grocery" onClick={() => setDropdownOpen(false)}>Grocery</a>
              <a href="/cart" onClick={() => setDropdownOpen(false)}>Cart</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;