import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitFailure = errMsg => {
    this.setState({
      showSubmitError: true,
      errorMsg: errMsg,
      username: '',
      password: '',
    })
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitCredentials = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userCredentials = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }
    const response = await fetch(apiUrl, options)
    const dataResponse = await response.json()
    console.log(dataResponse)
    if (response.ok === true) {
      this.onSubmitSuccess(dataResponse.jwt_token)
    } else {
      this.onSubmitFailure(dataResponse.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value, showSubmitError: false})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, showSubmitError: false})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="display-container">
        <img
          src="https://res.cloudinary.com/dwp6uyiir/image/upload/v1656090745/Layer_2_jdwyjj.png"
          alt="website login"
        />
        <div className="login-form-container">
          <img
            src="https://res.cloudinary.com/dwp6uyiir/image/upload/v1656091353/Standard_Collection_8_vblsmr.png"
            alt="website logo"
          />
          <h1 className="webpage-name">Insta Share</h1>
          <form onSubmit={this.onSubmitCredentials} className="form-container">
            <label htmlFor="username" className="label-text">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              placeholder="USERNAME"
              value={username}
              className="input-text"
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="label-text">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              placeholder="PASSWORD"
              className="input-text"
              value={password}
              onChange={this.onChangePassword}
            />
            {showSubmitError && <p className="errorMsg">*{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
