import React from 'react'

import Player from './components/Player'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Notifications from './components/Notifications'

function App () {
    return (
        <section>
            <Navbar/>
            <Player/>
            <Sidebar>
                <Notifications/>
            </Sidebar>

        </section>
    )
}

export default App
