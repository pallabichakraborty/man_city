import React from 'react';
import {CityLogo} from '../ui/icons';

const footer = () => {
    return (
        <footer className="bck_blue">
            <div className="footer_logo">
            <CityLogo link={true}
                      linkTo="/"
                      width="70px"
                       height="70px"
            ></CityLogo>
            </div>
            <div className="footer_discl">Manchester City © {new Date().getFullYear()}. All Rights Reserved</div>
        </footer>
    );
};

export default footer;