import { NavLink } from "react-router-dom";
import { COCKTAIL_TYPES } from "../../types";
import "./Navigation.scss";
import { useState } from "react";

const TYPE_DISPLAY_NAMES: Record<string, string> = {
  margarita: "Margarita",
  mojito: "Mojito",
  ai: "A1",
  kir: "Kir",
};

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="navigation">
      <button
        className="navigation__burger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>
      <div
        className={`navigation__links ${
          isMenuOpen ? "navigation__links--open" : ""
        }`}
      >
        {COCKTAIL_TYPES.map((type) => (
          <div key={type} className="navigation__block-link">
            <NavLink
              key={type}
              to={`/${type}`}
              className={({ isActive }) =>
                isActive
                  ? "navigation__block-link--link__active"
                  : "navigation__block-link--link"
              }
            >
              {TYPE_DISPLAY_NAMES[type] || type}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
