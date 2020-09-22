import React from 'react';
import PropTypes from "prop-types";
// import styles from '../../styles/index.scss';

const BlueButton =(props)=> {
  const { text } = props

  return(
    <div>
      {text}
    </div>
  )
}

BlueButton.propTypes = {
  text: PropTypes.string,
}

export { BlueButton };
