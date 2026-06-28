import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const LINKS = {
  Company:        ['About Us', 'Careers', 'Press', 'Investors'],
  'Help & Support': ['Help Center', 'FAQs', 'Support', 'Account & Billing'],
  Legal:          ['Terms of Service', 'Privacy Policy', 'Cookie Preferences', 'Accessibility'],
};

function Footer() {
  const [email, setEmail] = useState('');

  return (
    <>
      <div className="cta-banner">
        <div className="cta-banner__text">
          <h2>Start your free trial today!</h2>
          <p>Join Now with your Email Address and Choose your plan to get Started.</p>
        </div>
        <form className="cta-banner__form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
          />
          <button type="submit">Join Now</button>
        </form>
      </div>

      <footer className="footer">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo__c">C</span>ine Sphere
            </Link>
            <p>
              CineSphere is your go-to platform for a world of entertainment,
              offering a vast library of films, TV shows, and exclusive content.
            </p>
            <div className="footer__socials">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Twitter">t</a>
              <a href="#" aria-label="Instagram">in</a>
            </div>
          </div>

          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading} className="footer__col">
              <h4>{heading}</h4>
              <ul>
                {items.map((item) => (
                  <li key={item}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          ©All Rights Reserved. 2024 Cinesphere Movies
        </div>
      </footer>
    </>
  );
}

export default Footer;
