import React from 'react';
import './Footer.css';
import logoFooter from '../../assets/img/logo.png';
import facebookIcon from '../../assets/img/facebook.png';
import twitterIcon from '../../assets/img/x.png';
import instagramIcon from '../../assets/img/instagram.png';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
    const navigate = useNavigate()

    const handleTransfer = () => {
        navigate('/Transfer')
    }

    const handleDeposit = () => {
        navigate('/Deposit')
    }

    const handleBuyed = () => {
        navigate('/Buyed')
    }

    return (
        <footer className='body-footer'>
            <div className='container-footer'>
                <div className='wrapper'>
                    <div className='footer-widget'>
                        <a href='#'>
                            <img src={logoFooter} className='logo'/>
                        </a>
                        <p className='desc'>
                            Banchito es un banco cercano e innovador, enfocado en tus necesidades. Ofrecemos atención personalizada, servicios modernos y una fuerte conexión comunitaria. ¡Bienvenido a Banchito!
                        </p>
                        <ul className='socials'>
                            <li>
                                <a href='#'>
                                    <img src={facebookIcon} className='social-icons' />
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <img src={twitterIcon} className='social-icons' />
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <img src={instagramIcon} className='social-icons' />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='footer-widget'>
                        <h6>Quick Link</h6>
                        <ul className='links'>
                            <li><a href="/Home">home</a></li>
                            <li><a href="#">about</a></li>
                            <li><a href="#">contact</a></li>
                        </ul>
                    </div>
                    <div className='footer-widget'>
                        <h6>Services</h6>
                        <ul className='links'>
                            <li><a onClick={handleTransfer}>Transaccion</a></li>
                            <li><a onClick={handleDeposit}>Deposito</a></li>
                            <li><a onClick={handleBuyed}>Compra</a></li>
                        </ul>
                    </div>
                    <div className='footer-widget'>
                        <h6>Help &amp; Support</h6>
                        <ul className='links'>
                            <li><a href="#">support</a></li>
                            <li><a href="#">terms &amp; conditions</a></li>
                        </ul>
                    </div>
                </div>
                <div className="copyright-wrapper">
                    <p>Design and Developed by
                        <a href="#" target='blank'> Gauchitos.S.A</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};
