import React, { useContext, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard/src'

import { SocketContext } from '../context/Context'

function Sidebar ({ children }) {
    const { callAccepted, callEnded, user, guest, setGuest, callGuest, leaveCall } = useContext(SocketContext)

    const [idToCall, setIdToCall] = useState('')

    return (
        <div className={'sidebar'}>
            <form className={'container-fluid d-flex flex-row w-50'}>
                <div className={'align-items-center d-flex flex-column justify-content-start shadow w-100'}>
                    <div className={'align-items-center flex-column flex-lg-row mt-3 submit'}>

                        <div className={'align-items-center d-flex justify-content-center rounded pb'} typeof={'button'}>
                            <i className={'uil uil-copy fs-4 pr'}></i>

                            <CopyToClipboard text={user}>
                                <button className={'m-0'} id={'btn-submit'} type={'submit'}>Copy your ID</button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>

                <div className={'align-items-center d-flex flex-column justify-content-start shadow w-100'}>
                    <div className={'align-items-center flex-column flex-lg-row mt-3 submit'}>

                        <div className={'align-items-center d-flex justify-content-center rounded pb'} typeof={'button'}>
                            <i className={'uil uil-outgoing-call fs-4 pr'}></i>

                            <input className={'border-0 bg-gray form-control input'} value={idToCall}
                                   onChange={(event) => setIdToCall(event.target.value)}
                                   placeholder={'ID to call'}
                                   type="text"
                            />

                            {callAccepted && !callEnded ? (
                                <button className={'m-0'} id={'btn-submit'} type={'submit'} onClick={leaveCall}>
                                    Hang up
                                </button>

                            ) : (
                                <button className={'m-0'} id={'btn-submit'} type={'submit'} onClick={() => callGuest(idToCall)}>
                                    Call
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
            {children}
        </div>
    )
}

export default Sidebar
