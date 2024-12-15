import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <nav className="footer-nav">
        <a href="#">Home</a> |<a href="#">Quienes Somos</a> |<a href="#">Servicios</a> |
        <a href="#">Contacto</a>
      <div className="social-icons">
          <a href="#">
            <img
              src="https://res.cloudinary.com/dyeppbrfl/image/upload/v1732319894/facebook_w83mhe.png"
              alt="Facebook"
              className="social-icon"/>
          </a>
          <a href="#">
            <img
              src="https://res.cloudinary.com/dyeppbrfl/image/upload/v1732319894/twitter_decs62.png"
              alt="Twitter"
              className="social-icon"/>
          </a>
          <a href="#">
            <img
              src="https://res.cloudinary.com/dyeppbrfl/image/upload/v1734092529/github_pikgoy.png"
              alt="Githhub"
              className="social-icon"/>
          </a>
        </div>
        </nav>

    </footer>
  );
};

export default Footer;
