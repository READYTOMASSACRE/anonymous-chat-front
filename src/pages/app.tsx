import * as React from "react"
import "../styles/index.sass"
import Chat from '../components/chat'
import { Router } from "@gatsbyjs/reach-router"

export default () => (
    <Router basepath="/">
        <Chat default/>
    </Router>
)
