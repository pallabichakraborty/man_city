import React from 'react';
import PromotionAnimation from './promotionAnimation';
import Enroll from './enroll';

const Promotion = () => {
    return (
        <div className="promotion_wrapper"
            style ={{
                background:'#ffffff'
            }}>
            <div className="container">
                <PromotionAnimation />
                <Enroll></Enroll>
            </div>
            
        </div>
    );
};

export default Promotion;