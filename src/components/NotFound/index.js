import './index.css'

const NotFound = props => {
  const revertToHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="notFound-Container">
      <img
        src="https://res.cloudinary.com/dwp6uyiir/image/upload/v1656231514/erroring_1_art4en.png"
        alt="page not found"
      />
      <h1 className="heading">PAGE NOT FOUND</h1>
      <p className="para">
        we are sorry, the page you requested could not be found
      </p>
      <button type="button" onClick={revertToHome} className="homeButton">
        Home Page
      </button>
    </div>
  )
}

export default NotFound
