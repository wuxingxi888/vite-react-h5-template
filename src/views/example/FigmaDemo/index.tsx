import type React from 'react';

import arrowRightIcon from '@/assets/figma-demo/arrow-right.svg';
import backIcon from '@/assets/figma-demo/back.svg';
import bathtubIcon from '@/assets/figma-demo/bathtub.svg';
import downIcon from '@/assets/figma-demo/down.svg';
import foodIcon from '@/assets/figma-demo/food.svg';
import heartIcon from '@/assets/figma-demo/heart.svg';
import poolIcon from '@/assets/figma-demo/pool.svg';
import productImage from '@/assets/figma-demo/product-image-48b6bf.png';
import rectangleBg from '@/assets/figma-demo/rectangle-989.png';
import starIcon from '@/assets/figma-demo/star.svg';
import wifiIcon from '@/assets/figma-demo/wifi.svg';

import './index.scss';

const FigmaDemo: React.FC = () => {
    const handleBack = () => {
        // 返回逻辑
        window.history.back();
    };

    const handleFavorite = () => {
        // 收藏逻辑
        console.log('Toggle favorite');
    };

    const handleShowMap = () => {
        // 显示地图逻辑
        console.log('Show map');
    };

    const handleReadMore = () => {
        // 展开更多描述逻辑
        console.log('Read more');
    };

    const handleBookNow = () => {
        // 预订逻辑
        console.log('Book now');
    };

    const amenities = [
        { icon: wifiIcon, text: '1 Heater' },
        { icon: foodIcon, text: 'Dinner' },
        { icon: bathtubIcon, text: '1 Tub' },
        { icon: poolIcon, text: 'Pool' },
    ];

    return (
        <div className="w-full h-full">
            <div className="figma-demo">
                {/* 产品图片区域 */}
                <div className="product-image-section">
                    <div className="image-container">
                        <img src={rectangleBg} alt="background" className="background-image" />
                        <img src={productImage} alt="Product" className="product-image" />
                    </div>
                    <button className="back-button" type="button" onClick={handleBack}>
                        <img src={backIcon} alt="Back" />
                    </button>
                    <button className="favorite-button" type="button" onClick={handleFavorite}>
                        <img src={heartIcon} alt="Favorite" />
                    </button>
                </div>

                {/* 产品信息区域 */}
                <div className="product-info-section">
                    <div className="title-section">
                        <div>
                            <h1 className="title">Coeurdes Alpes</h1>
                            <div className="review-section">
                                <div className="star-group">
                                    <img src={starIcon} alt="Star" className="star-icon" />
                                    <span className="rating-text">4.5 (355 Reviews)</span>
                                </div>
                            </div>
                        </div>
                        <span className="show-map" onClick={handleShowMap}>
                            Show map
                        </span>
                    </div>

                    <div className="description-section">
                        <p className="description">
                            Aspen is as close as one can get to a storybook alpine town in America.
                            The choose-your-own-adventure possibilities—skiing, hiking, dining
                            shopping and ....
                        </p>
                        <div className="read-more" onClick={handleReadMore}>
                            <span>Read more</span>
                            <img src={downIcon} alt="Down" className="down-icon" />
                        </div>
                    </div>
                </div>

                {/* 设施信息区域 */}
                <div className="facilities-section">
                    <h2 className="facilities-title">Facilities</h2>
                    <div className="amenities">
                        {amenities.map((amenity) => (
                            <div key={amenity.text} className="amenity-item">
                                <img
                                    src={amenity.icon}
                                    alt={amenity.text}
                                    className="amenity-icon"
                                />
                                <span className="amenity-text">{amenity.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 预订区域 */}
                <div className="book-section">
                    <div className="price-section">
                        <span className="price-label">Price</span>
                        <span className="price-value">$199</span>
                    </div>
                    <button className="book-button" type="button" onClick={handleBookNow}>
                        <span className="book-text">Book Now</span>
                        <img src={arrowRightIcon} alt="Arrow" className="arrow-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FigmaDemo;
