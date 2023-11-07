import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Home.css";

const ProjectPresentation = () => {
  const { t } = useTranslation();

  return (
    <div className="project-presentation">
      <h1>{t("home.pageTitle")}</h1>
      <p>{t("home.description")}</p>
      <h2>{t("home.features")}</h2>
      <ul className="project-links">
        <li>
          <Link to={`/dashboard`} className="project-link">
            {t("home.dashboard")}
          </Link>
        </li>
        <li>
          <Link to={`/list`} className="project-link">
            {t("home.list")}
          </Link>
        </li>
      </ul>
      <h2>{t("home.usedTech")}</h2>
      <ul>
        <li>
          <p>Vite</p>
        </li>
        <li>
          <p>React JS</p>
        </li>
        <li>
          <p>Axios</p>
        </li>
      </ul>
      <h2>{t("home.team")}</h2>
      <ul>
        <li>
          <p>Dionmax FN</p>
        </li>
      </ul>
    </div>
  );
};

export default ProjectPresentation;
