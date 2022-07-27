import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class SliderItem extends Component {
  state = {storyList: [], apiStoriesStatus: apiStatus.initial}

  componentDidMount() {
    this.getStoriesData()
  }

  getStoriesData = async () => {
    this.setState({apiStoriesStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const DataResponseDB = await response.json()
    const stories = DataResponseDB.users_stories
    const updatedData = stories.map(eachStory => ({
      storyUrl: eachStory.story_url,
      userId: eachStory.user_id,
      userName: eachStory.user_name,
    }))
    // console.log(updatedData)
    if (response.ok === true) {
      this.setState({
        apiStoriesStatus: apiStatus.success,
        storyList: updatedData,
      })
    } else {
      this.setState({apiStoriesStatus: apiStatus.failure})
    }
  }

  storiesFailureView = () => (
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

  renderSlider = () => {
    const settings = {
      infinite: false,
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    const {storyList} = this.state

    return (
      <ul>
        <Slider {...settings}>
          {storyList.map(storyItem => (
            <div className="slick-item" key={storyItem.userId}>
              <div className="slick-item-container">
                <img
                  src={storyItem.storyUrl}
                  alt="user story"
                  className="logo-image"
                />
                <p>{storyItem.userName}</p>
              </div>
            </div>
          ))}
        </Slider>
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfileContent = () => {
    const {apiStoriesStatus} = this.state
    switch (apiStoriesStatus) {
      case apiStatus.success:
        return this.renderSlider()
      case apiStatus.failure:
        return this.storiesFailureView()
      case apiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {isLoading} = this.state

    return <div>{isLoading ? this.renderLoader() : this.renderSlider()}</div>
  }
}

export default SliderItem
