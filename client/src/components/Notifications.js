import React, { useContext } from 'react'

import { SocketContext } from '../context/Context'

function Notifications () {
    const { call, answerCall, callAccepted } = useContext((SocketContext))

    return (
        <div className={'sidebar'}>
            <form className={'container-fluid d-flex w-50'} autoComplete={'off'} noValidate>
                {call.isReceivingCall && !callAccepted && (
                    <div className={'align-items-center border d-flex flex-row justify-content-center p-3 shadow w-100'}>
                        <button className={'align-items-center border call-btn d-flex sidebar-items'}
                                onClick={answerCall}
                                type={'button'}>

                            <i className={'uil uil-outgoing-call fs-4 pr'}></i> Accept call from {call.name || 'Guest'}?
                        </button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Notifications
