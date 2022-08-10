import React, { useContext, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard/src'

import { SocketContext } from '../context/Context'

function Sidebar ({ children }) {
    const { callAccepted, callEnded, user, callGuest, leaveCall } = useContext(SocketContext)

    const [idToCall, setIdToCall] = useState('')

    return (
        <div className={'sidebar'}>
            <form className={'container-fluid d-flex w-50'} autoComplete={'off'} noValidate>
                <div className={'align-items-center border d-flex justify-content-around p-3 shadow sidebar-card w-100'}>

                    <div className={'align-items-center d-flex justify-content-center rounded sidebar-items'}>
                        <i className={'uil uil-copy fs-4 pr'}></i>

                        <CopyToClipboard text={user}>
                            <button className={'m-0'} type={'button'}>Copy your ID</button>
                        </CopyToClipboard>
                    </div>

                    <div className={'align-items-center border d-flex justify-content-center rounded pl-10'}>
                        <i className={'uil uil-qrcode-scan fs-4 pr'}></i>

                        <input className={'border-0 bg-gray form-control input'} value={idToCall}
                               onChange={(event) => setIdToCall(event.target.value)}
                               placeholder={'ID to call'}
                               type="text"
                        />

                        {callAccepted && !callEnded ? (
                            <button className={'align-items-center border call-btn d-flex sidebar-items'}
                                    onClick={leaveCall}
                                    type={'button'}>

                                <i className={'uil uil-phone-times fs-4 pr'}></i> Hang up
                            </button>

                        ) : (
                            <button className={'align-items-center border call-btn d-flex sidebar-items'}
                                    onClick={() => callGuest(idToCall)}
                                    type={'button'}>

                                <i className={'uil uil-outgoing-call fs-4 pr'}></i> Call
                            </button>
                        )}
                    </div>
                </div>
            </form>

            {children}
        </div>
    )
}

export default Sidebar
