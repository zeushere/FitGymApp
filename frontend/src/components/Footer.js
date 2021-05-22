/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './Footer.css';
import useWindowDimensions from './WindowDimension';


const Footer = props => {
    const {width } = useWindowDimensions();
    return (
        <BrowserRouter>
            <div className="main-footer bg-dark">
                <div className="container">
                    <div className="row">
                        <div class="col-sm-12 col-md-4 align-self-center">
                            <h3 className="text-warning ">Information about the site</h3>
                            <p>On our website you can buy a subscription to a diet and a coaching service. We cordially invite you to purchase!</p>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <h3 className="text-warning">Szybkie linki:</h3>
                            <ul className={width > 100 ? "mr-4" : "mr-0"}>
                                <li><a href="#" cl>O nas</a></li>
                                <li><a href="#">Artykuły</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Regulamin</a></li>

                            </ul>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <h3 className="text-warning">Kontakt</h3>
                            <p><a href="mailto:admin@example.com">kacper.roda37@gmail.com</a></p>
                            <p>ul. Rody 20</p>
                            <p>27-600 Sandomierz</p>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <p className="col-sm">
                            &copy;{new Date().getFullYear()} FitGym Sp. z o.o | All rights reserved | Terms Of Service | Privacy
                    </p>
                    </div>
                </div>

            </div>

        </BrowserRouter>
    );
};


export default Footer;