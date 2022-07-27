import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import CreatePost from '../CreatePost'
import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class PostCard extends Component {
  state = {postCards: [], apiPostStatus: apiStatus.initial}

  componentDidMount() {
    this.postCardDetails()
  }

  postCardDetails = async () => {
    this.setState({apiPostStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const postUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const responsePost = await fetch(postUrl, options)
    const postData = await responsePost.json()
    const postDataDetails = postData.posts
    const updatedPostData = postDataDetails.map(eachPost => ({
      comments: eachPost.comments,
      createdAt: eachPost.created_at,
      likesCount: eachPost.likes_count,
      postDetails: eachPost.post_details,
      postId: eachPost.post_id,
      profilePic: eachPost.profile_pic,
      userId: eachPost.user_id,
      userName: eachPost.user_name,
    }))
    if (responsePost.ok === true) {
      this.setState({
        postCards: updatedPostData,
        apiPostStatus: apiStatus.success,
      })
    } else {
      this.setState({apiPostStatus: apiStatus.failure})
    }
  }

  successPostView = () => {
    const {postCards} = this.state

    return (
      <ul className="postCardList">
        {postCards.map(eachPost => (
          <CreatePost eachPost={eachPost} key={eachPost.postId} />
        ))}
      </ul>
    )
  }

  failurePostView = () => (
    <div className="postFailureContainer">
      <img
        src="https://res.cloudinary.com/dwp6uyiir/image/upload/v1656307482/alert-triangle_dsbpxy.png"
        alt="failure view"
        className="postFailureImage"
      />
      <p className="postFailurePara">Something went wrong. Please try again</p>
      <button type="button" className="postFailureButton">
        Try Again
      </button>
    </div>
  )

  LoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderPost = () => {
    const {apiPostStatus} = this.state
    switch (apiPostStatus) {
      case apiStatus.success:
        return this.successPostView()
      case apiStatus.failure:
        return this.failurePostView()
      case apiStatus.inProgress:
        return this.LoaderView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderPost()}</div>
  }
}

export default PostCard
