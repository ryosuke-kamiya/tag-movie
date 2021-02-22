import React, { useEffect, useState } from 'react';

import { useModal } from '../../hooks/useModal'

const Modal = () => {
    const {modal, setModal} = useModal()

    const closeModal = () => {
        setModal(false)
    }

    const [topPosition, setTopPosition] = useState(Number)

    useEffect(() => {
        if(modal){
            setTopPosition(document.documentElement.scrollTop)
            document.body.style.top = - document.documentElement.scrollTop + "px"
            document.body.classList.add('bodyFixed')
        }else{
            document.body.classList.remove('bodyFixed')
            document.body.style.top = ""
            document.documentElement.scrollTop = topPosition
        }
    },[modal])

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