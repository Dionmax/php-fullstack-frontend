import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import I18n from "../I18n/I18n";
import "./Navbar.css";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <h2>
        <Link to={`/`}>
          <p>{t("home.home")}</p>
        </Link>
      </h2>
      <div className="flags">
        <I18n />
      </div>
      <ul>
        <li className="switch-page-btn">
          <Link to={`/list`}>{t("home.list")}</Link>
        </li>
        <li className="switch-page-btn">
          <Link to={`/dashboard`}>{t("home.dashboard")}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
