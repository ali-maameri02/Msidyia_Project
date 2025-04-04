import React from "react";

interface CardProps {
  cardClass?: string;
  imageWrapperClass?: string;
  cover?: string;
  imageAlt?: string;
  imageSrc?: string;
  textWrapperClass?: string;
  children?: React.ReactNode;
  onClick?: () => void; // Add this line

}

const Card: React.FC<CardProps> = ({
    cardClass,
    imageWrapperClass,
    cover,
    imageAlt,
    imageSrc,
    textWrapperClass,
    children,
    onClick, // Destructure the onClick prop
  }) => {
    return (
      <div className={cardClass} onClick={onClick}> {/* Pass onClick here */}
        <div className={imageWrapperClass}>
          <img src={imageSrc} alt={imageAlt} className={cover} />
        </div>
        <div className={textWrapperClass}>{children}</div>
      </div>
    );
  };

export default Card;