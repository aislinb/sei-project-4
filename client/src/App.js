import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'
import Footer from './components/common/Footer'
import CropIndex from './components/crops/CropIndex'
import CropNew from './components/crops/CropNew'
import CropShow from './components/crops/CropShow'
import ProfileShow from './components/user/ProfileShow'
import ProfileEdit from './components/user/ProfileEdit'

import About from './components/filler_pages/About'
import Contact from './components/filler_pages/Contact'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

function App() {

  // axios get moved to api.js and EventIndex.js

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/crops/new" component={CropNew} />
        <Route path="/crops/:id" component={CropShow} />
        <Route path="/crops" component={CropIndex} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={ProfileShow} />
        <Route path="/update-profile" component={ProfileEdit} />
        <Route path="/about-us" component={About} />
        <Route path="/contact-us" component={Contact} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )

}

export default App
