import { Link } from 'react-router-dom';

import uicLogo from '../assets/img/logo-uic.png';
import footerLogo from '../assets/img/logo-united-hearts-for-canada-2.png';

import { useTranslations } from '../hooks/translations';

const Footer = () => {
  const text = useTranslations('footer');

  return (
    <footer className="flex flex-col items-center justify-center bg-black h-59.5 text-gray-400">
      <div className="flex items-center">
        <span className="text-sm font-semibold">{text.reservedMark}</span>
        <img className="h-5 ml-2 mr-1" src={uicLogo} alt="uic" />
        <span className="text-sm font-semibold">{text.reserved}</span>
      </div>
      <p className="text-xs font-medium mt-5"><Link to="/terms" className="hover:underline">{text.terms}</Link> | <Link to="/privacy" className="hover:underline">{text.privacy}</Link></p>
      <img className="h-12 mt-8" src={footerLogo} alt="Footer logo for UIC" />
    </footer>
  );
};

export default Footer;
