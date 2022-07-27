import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'

const websiteLogo =
  'https://res.cloudinary.com/dwp6uyiir/image/upload/v1656091353/Standard_Collection_8_vblsmr.png'

class Header extends Component {
  state = {inputSearch: ''}

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/')
  }

  onEnterSearchInput = event => {
    const {inputSearch} = this.state
    const {searchMethod} = this.props
    if (event.key === 'Enter') {
      searchMethod(inputSearch)
    }
  }

  onClickSearchButton = () => {
    const {inputSearch} = this.state
    const {searchMethod} = this.props
    searchMethod(inputSearch)
  }

  onChangeInputSearch = event => {
    this.setState({inputSearch: event.target.value})
  }

  render() {
    const {inputSearch} = this.state

    return (
      <nav className="navBarContainer">
        <div className="navBarMiniContainer">
          <ul className="navBarLogoContainer">
            <li>
              <Link to="/">
                <img
                  src={websiteLogo}
                  alt="website logo"
                  className="website-logo"
                />
              </Link>
            </li>
            <li>
              <h1 className="websiteTitle">Insta Share</h1>
            </li>
          </ul>
          <ul className="navBarMiniContents">
            <li className="search-container">
              <input
                type="search"
                placeholder="Search Caption"
                className="searchInput"
                value={inputSearch}
                onChange={this.onChangeInputSearch}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                className="buttonSearch"
                onClick={this.onClickSearchButton}
                testid="searchIcon"
              >
                <FaSearch />
              </button>
            </li>
            <li>
              <Link to="/">
                <h1 className="listItem">Home</h1>
              </Link>
            </li>
            <li>
              <Link to="/my-profile">
                <h1 className="listItem">Profile</h1>
              </Link>
            </li>
            <button
              type="button"
              className="LogOutButton"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
