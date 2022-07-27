import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home/index'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute/index'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/my-profile" component={Profile} />
    <ProtectedRoute exact path="/users/:id" component={UserProfile} />
    <ProtectedRoute component={NotFound} />
  </Switch>
)

export default App
