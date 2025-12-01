import "./Footer.css";
import FooterAbout from "./FooterAbout";
import FooterGroupCompanies from "./FooterGroupCompanies";
import FooterHelp from "./FooterHelp";
import FooterPolicy from "./FooterPolicy";
import FooterContact from "./FooterContact";
import FooterAddress from "./FooterAddress";
import FooterBottom from "./FooterBottom";
export default function Footer() {
  return (
    <>
      <footer className="footer-container">
        <div className="footer-top">
          <div className="left-side">
            <FooterAbout />
            <FooterGroupCompanies />
            <FooterHelp />
            <FooterPolicy />
          </div>
          <div className="right-side">
            <FooterContact />
            <FooterAddress />
          </div>
        </div>
        <div className="footer-bottom">
          <FooterBottom />
        </div>
      </footer>
    </>
  );
}
