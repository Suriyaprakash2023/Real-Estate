import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ totalStars = 5, initialRating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (ratingValue) => {
    onRatingChange(ratingValue); // Update the parent state with the selected rating
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => setHoverRating(ratingValue)}
            onMouseLeave={() => setHoverRating(0)}
            style={{
              cursor: 'pointer',
              color: ratingValue <= (hoverRating || initialRating) ? 'gold' : 'gray',
              fontSize: '2.5rem',
              transition: 'color 0.25s ease, transform 0.25s ease',  // Smooth transition
              transform: ratingValue <= (hoverRating || initialRating) ? 'scale(1.1)' : 'scale(1)', // Slight enlargement on hover
              margin: '0 5px',
            }}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
