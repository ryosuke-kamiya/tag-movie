import React from 'react';

import { useModal } from '../../hooks/useModal'

const Modal = () => {
    const {modal, setModal} = useModal()

    const closeModal = () => {
        setModal(false)
    }

    return modal ? (
        <div className='modal'>
            <div className='closeBackground' onClick={closeModal}></div>
            <div className='wrapper'>
                <div className='closeButton' onClick={closeModal}>×</div>
                {modal}
            </div>
        </div>
    ) : null
}

export {Modal}