import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <span
      style={{ cursor: 'pointer', color: filled ? 'gold' : 'gray', fontSize: '2rem' }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <FontAwesomeIcon icon={faStar} />
    </span>
  );
};

export default Star;
