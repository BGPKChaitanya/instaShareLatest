import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './index.css'

const ProfileCard = props => {
  const {profileData, profileAltName} = props
  const {
    followersCount,
    followingCount,
    posts,
    postsCount,
    profilePic,
    stories,
    userBio,
    userId,
    userName,
  } = profileData
  const {profile, story, post} = profileAltName
  const lenPost = posts.length

  const profileStories = () => (
    <ul className="storiesContainer">
      {stories.map(eachStory => (
        <li key={eachStory.id}>
          <img src={eachStory.image} alt={story} className="storyImage" />
        </li>
      ))}
    </ul>
  )

  const postFailureView = () => (
    <div className="noPostContainer">
      <div className="camContainer">
        <BiCamera className="camImage" />
      </div>
      <h1 className="noPostsText">No Posts</h1>
    </div>
  )

  const postSuccessView = () => (
    <div>
      <div className="postContainer">
        <BsGrid3X3 className="boxIcon" />
        <h1 className="postText">Posts</h1>
      </div>
      <ul className="postsList">
        {posts.map(eachPost => (
          <li key={eachPost.id} className="postItem">
            <img src={eachPost.image} alt={post} className="postImage" />
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="container">
      <div className="profileContainer">
        <img src={profilePic} alt={profile} className="profilePic" />
        <div className="profileDetails">
          <h1 className="profileName">{userName}</h1>
          <div className="profilePostContainer">
            <p className="profileContent">{postsCount} posts</p>
            <p className="profileContent">{followersCount} followers</p>
            <p className="profileContent">{followingCount} following</p>
          </div>
          <p>{userId}</p>
          <p>{userBio}</p>
        </div>
      </div>
      {stories !== undefined && profileStories()}
      <hr />
      {lenPost <= 0 ? postFailureView() : postSuccessView()}
    </div>
  )
}

export default ProfileCard
