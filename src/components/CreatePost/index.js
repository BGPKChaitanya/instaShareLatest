import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import './index.css'

class CreatePost extends Component {
  state = {likeStatus: false}

  onClickLikeStatus = async () => {
    const {likeStatus} = this.state
    if (likeStatus) {
      this.setState(prevState => ({likesCount: prevState.likesCount + 1}))
    }
    const {eachPost} = this.props
    const {postId} = eachPost
    const jwtToken = Cookies.get('jwt_token')
    const likeUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const responseObject = {like_status: !likeStatus}
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(responseObject),
    }
    const response = await fetch(likeUrl, options)
    const responseData = await response.json()
    console.log(responseData)
    if (response.ok) {
      this.setState({likeStatus: !likeStatus})
    }
  }

  renderComments = comments => (
    <div className="containerComment">
      {comments.map(eachComment => (
        <div className="comment" key={eachComment.user_id}>
          <p className="comment-heading">{eachComment.user_name}</p>
          <p className="comment-description">{eachComment.comment}</p>
        </div>
      ))}
    </div>
  )

  render() {
    const {eachPost} = this.props
    const {likeStatus} = this.state
    const {
      comments,
      createdAt,
      likesCount,
      postDetails,
      userId,
      profilePic,
      userName,
    } = eachPost
    const updatedPostDetails = {
      caption: postDetails.caption,
      imageUrl: postDetails.image_url,
    }
    const {caption, imageUrl} = updatedPostDetails

    return (
      <li className="postContainer1">
        <div className="user_author_container">
          <img
            src={profilePic}
            alt="post author profile"
            className="author_photo"
          />
          <Link to={`/users/${userId}`}>
            <h1 className="user-name">{userName}</h1>
          </Link>
        </div>
        <img src={imageUrl} alt="post" className="post" />
        <div className="comment-container1">
          <div>
            {likeStatus ? (
              <button
                type="button"
                testid="unLikeIcon"
                onClick={this.onClickLikeStatus}
              >
                <FcLike />
              </button>
            ) : (
              <button
                type="button"
                testid="likeIcon"
                onClick={this.onClickLikeStatus}
              >
                <BsHeart />
              </button>
            )}
            <FaRegComment />
            <BiShareAlt />
          </div>
          <p className="likeCount">{likesCount} Likes</p>
          <p className="caption">{caption}</p>
          {this.renderComments(comments)}
          <p className="createdTime">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default CreatePost
