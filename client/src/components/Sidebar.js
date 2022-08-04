import React, { useContext, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard/src'

import { SocketContext } from '../context/Context'

function Sidebar ({ children }) {
    const { callAccepted, callEnded, user, guest, setGuest, callGuest, leaveCall } = useContext(SocketContext)

    const [idToCall, setIdToCall] = useState('')

    return (
        <form className={'container-fluid'}>
            <div className={'align-items-center d-flex flex-column justify-content-start w-100'}>
                <div className={'align-items-center flex-column flex-lg-row mt-3 submit'}>

                    <div className={'align-items-center d-flex justify-content-center rounded pb'} typeof={'button'}>
                        <i className={'uil uil-copy fs-4 pr'}></i>

                        <CopyToClipboard text={user}>
                            <button className={'m-0'} id={'btn-submit'} type={'submit'}>Copy your ID</button>
                        </CopyToClipboard>
                    </div>
                </div>

            </div>
        </form>
    )
}

export default Sidebar
