import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfileCard from '../ProfileCard'
// import FailureView from '../FailureView'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class Profile extends Component {
  state = {profileData: [], apiProfileStatus: apiStatus.initial}

  componentDidMount() {
    this.renderProfile()
  }

  renderProfile = async () => {
    this.setState({apiProfileStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const profileResponse = await fetch(profileUrl, options)
    const profileData = await profileResponse.json()
    const profileDataResponse = profileData.profile
    const updatedData = {
      followersCount: profileDataResponse.followers_count,
      followingCount: profileDataResponse.following_count,
      id: profileDataResponse.id,
      posts: profileDataResponse.posts,
      postsCount: profileDataResponse.posts_count,
      profilePic: profileDataResponse.profile_pic,
      stories: profileDataResponse.stories,
      userBio: profileDataResponse.user_bio,
      userId: profileDataResponse.user_id,
      userName: profileDataResponse.user_name,
    }
    // console.log(profileResponse)
    if (profileResponse.ok === true) {
      this.setState({
        profileData: updatedData,
        apiProfileStatus: apiStatus.success,
      })
    } else {
      this.setState({apiProfileStatus: apiStatus.failure})
    }
  }

  profileFailureView = () => (
    <div className="failureContainer">
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

  renderProfileData = () => {
    const {profileData} = this.state
    const lenProfileData = profileData.length
    const profileAltName = {
      profile: 'my profile',
      story: 'my story',
      post: 'my post',
    }

    return (
      <div>
        {lenProfileData === 0 ? (
          this.LoaderView()
        ) : (
          <ProfileCard
            profileData={profileData}
            profileAltName={profileAltName}
          />
        )}
      </div>
    )
  }

  renderProfileContent = () => {
    const {apiProfileStatus} = this.state
    switch (apiProfileStatus) {
      case apiStatus.success:
        return this.renderProfileData()
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
        {this.renderProfileContent()}
      </div>
    )
  }
}

export default Profile
