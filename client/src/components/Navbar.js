import React from 'react'

function Navbar () {
    return (
        <nav>
            <div className={'align-items-center bg-white d-flex fixed-top navbar p-2 shadow'}>
                <div className={'container-fluid '}>
                    <h2 className={'fw-bold m-2'}>
                        <a href="/">Meetup</a>
                    </h2>

                    <div className={'align-items-center col d-flex justify-content-end'}>

                        <div className={'align-items-center d-flex justify-content-center'}>
                            <img className={'image-logo me-2 rounded-circle'} src={require('../images/user.png')} alt=""/>

                            <p className={'m-0'}>User</p>
                        </div>

                        <div className={'mx-4'}>
                            <button className={'btn'} type={'button'}>
                                <i className={'uil uil-signout fs-4'}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
