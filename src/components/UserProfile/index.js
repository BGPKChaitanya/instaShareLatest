import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import ProfileCard from '../ProfileCard'
import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class UserProfile extends Component {
  state = {userProfileData: [], apiUserProfile: apiStatus.initial}

  componentDidMount() {
    this.renderUserProfile()
  }

  renderUserProfile = async () => {
    this.setState({apiUserProfile: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const UserProfileApi = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchUserResponse = await fetch(UserProfileApi, options)
    const dataResponse = await fetchUserResponse.json()
    const getUserData = dataResponse.user_details
    const updatedUserProfileData = {
      followersCount: getUserData.followers_count,
      followingCount: getUserData.following_count,
      id: getUserData.id,
      posts: getUserData.posts,
      postsCount: getUserData.posts_count,
      profilePic: getUserData.profile_pic,
      stories: getUserData.stories,
      userBio: getUserData.user_bio,
      userId: getUserData.user_id,
      userName: getUserData.user_name,
    }
    if (fetchUserResponse.ok === true) {
      this.setState({
        userProfileData: updatedUserProfileData,
        apiUserProfile: apiStatus.success,
      })
    } else {
      this.setState({apiUserProfile: apiStatus.failure})
    }
  }

  profileFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dwp6uyiir/image/upload/v1658810557/Group_7522_lfqlzv.png"
        alt="failure view"
      />
      <h1>Something went wrong. Please try again</h1>
      <button
        type="button"
        className="tryAgainButton"
        onClick={this.renderProfile}
      >
        Try Again
      </button>
    </div>
  )

  LoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderUserProfileData = () => {
    const {userProfileData} = this.state
    const lenProfileData = userProfileData.length
    const profileAltName = {
      profile: 'user profile',
      story: 'user story',
      post: 'user post',
    }

    return (
      <div>
        {lenProfileData === 0 ? (
          this.LoaderView()
        ) : (
          <ProfileCard
            profileData={userProfileData}
            profileAltName={profileAltName}
          />
        )}
      </div>
    )
  }

  renderUserProfileContent = () => {
    const {apiUserProfile} = this.state
    switch (apiUserProfile) {
      case apiStatus.success:
        return this.renderUserProfileData()
      case apiStatus.failure:
        return this.profileFailureView()
      case apiStatus.inProgress:
        return this.LoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderUserProfileContent()}
      </div>
    )
  }
}

export default UserProfile
