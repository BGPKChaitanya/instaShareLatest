import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SliderItem from '../SliderItem'
import PostCard from '../PostCard'
import CreatePost from '../CreatePost'
import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    searchInput: '',
    searchResultList: [],
    apiSearchStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.searchDetails()
  }

  searchDetails = async () => {
    this.setState({apiSearchStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const searchUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const searchResponse = await fetch(searchUrl, options)
    const DataResponse = await searchResponse.json()
    const data = DataResponse.posts
    const updatesSearchResponse = data.map(eachResult => ({
      comments: eachResult.comments,
      createdAt: eachResult.created_at,
      likesCount: eachResult.likes_count,
      postDetails: eachResult.post_details,
      postId: eachResult.post_id,
      profilePic: eachResult.profile_pic,
      userId: eachResult.user_id,
      userName: eachResult.user_name,
    }))
    if (searchResponse.ok === true) {
      this.setState({
        searchResultList: updatesSearchResponse,
        apiSearchStatus: apiStatus.success,
      })
    } else {
      this.setState({apiSearchStatus: apiStatus.failure})
    }
  }

  searchFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dwp6uyiir/image/upload/v1656677492/Group_dsga9l.png"
        alt="search not found"
      />
      <h1>Search Not Found</h1>
      <p>Try different keyword or search again</p>
    </div>
  )

  LoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderNoPostsView = () => (
    <div className="noPostsContainer">
      <img
        src="https://res.cloudinary.com/dyyexkznb/image/upload/v1647830283/Group_olqwb0.jpg"
        alt="search not found"
        className="noSearchResultImage"
      />
      <h1>Search Not Found</h1>
      <p>Try different keyword or search again </p>
    </div>
  )

  searchResults = () => {
    const {searchResultList} = this.state

    return (
      <div>
        {searchResultList.length === 0 ? (
          this.renderNoPostsView()
        ) : (
          <div>
            <h1>Search Results</h1>
            <ul className="postCardList">
              {searchResultList.map(eachPost => (
                <CreatePost eachPost={eachPost} key={eachPost.postId} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  searchSuccessContent = () => {
    const {searchInput} = this.state

    return (
      <div className="homeMegaContainer">
        {searchInput !== '' ? (
          <div>{this.searchResults()}</div>
        ) : (
          <div>
            <SliderItem />
            <PostCard />
          </div>
        )}
      </div>
    )
  }

  renderSearchContent = () => {
    const {apiSearchStatus} = this.state
    switch (apiSearchStatus) {
      case apiStatus.success:
        return this.searchSuccessContent()
      case apiStatus.failure:
        return this.searchFailureView()
      case apiStatus.inProgress:
        return this.LoaderView()
      default:
        return null
    }
  }

  searchMethod = search => {
    this.setState({searchInput: search}, this.searchDetails)
  }

  render() {
    return (
      <div>
        <Header searchMethod={this.searchMethod} />
        {this.renderSearchContent()}
      </div>
    )
  }
}

export default withRouter(Home)
