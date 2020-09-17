import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from './Login'
export default function MainRouter () {

    return (
        <Router>
            <Switch>
                {/* <Route path='/signup' component={SignUp}></Route>
                <Route path='/spells' component={AllSpells}></Route>
                <Route path='/forgot' component={Forgot}></Route>
                <Route path='/createspellbook' component={CreateSpellbook}></Route>
                <Route path='/home' component={Home}></Route> */}
                <Route path='/' component={Login}></Route>
            </Switch>
        </Router>
    )
}