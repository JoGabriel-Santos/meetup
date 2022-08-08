import React, { useContext } from 'react'

import { SocketContext } from '../context/Context'

function Player () {
    const { callAccepted, callEnded, call, stream, user, userVideo, guestVideo } = useContext(SocketContext)

    return (
        <div className={'align-items-center d-flex card justify-content-around w-100'}>

            {stream && (
                <div className={'bg-white border form rounded shadow'}>

                    <video className={'w-100'} ref={userVideo} autoPlay muted playsInline></video>

                    <div className={'align-items-center d-flex info justify-content-start'}>
                        <div className={'user-image'}>
                            <img className={'image-logo me-2 rounded-circle'} src={require('../images/user.png')} alt=""/>
                        </div>

                        <h2 className={'fs-5 margin-0 text-muted'}>{user || 'User'}</h2>
                    </div>
                </div>
            )}

            {callAccepted && !callEnded && (
                <div className={'bg-white border form rounded shadow'}>

                    <video ref={guestVideo} autoPlay muted playsInline></video>

                    <div className={'align-items-center d-flex justify-content-start'}>
                        <div className={'user-image'}>
                            <img className={'image-logo me-2 rounded-circle'} src={require('../images/user.png')} alt=""/>
                        </div>

                        <h2 className={'fs-5 margin-0 text-muted'}>{call.name || 'Guest'}</h2>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Player
