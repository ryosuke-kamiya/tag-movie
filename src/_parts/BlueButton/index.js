import React from 'react';
import PropTypes from "prop-types";
// import styles from '../../styles/index.scss';

const BlueButton =(props)=> {
  const { text, link, onClick } = props

  return(
    <a className="blueButton" onClick={onClick} href={link}>
      {text}
    </a>
  )
}

BlueButton.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
}

export { BlueButton };
