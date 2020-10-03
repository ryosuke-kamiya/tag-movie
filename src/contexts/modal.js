import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types'

export const ModalContext = createContext([{}, () => {}])

export const ModalProvider = props => {
    const { children } = props
    const [modal, setModal] = useState(null)
    return(
        <ModalContext.Provider value={{ modal, setModal }}>
            {children}
        </ModalContext.Provider>
    )
}

ModalProvider.propTypes = {
    children: PropTypes.node
}

export default { ModalContext, ModalProvider }