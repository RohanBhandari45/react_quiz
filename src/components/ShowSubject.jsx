
const ShowSubject = ({subject, images, OnClick}) => {


  const handleClick = () => {
    OnClick(subject);
  }

  return (
      <>
    <div className='each-Subject' onClick={handleClick} >
      <img className="img" src={images} />
      {subject}
    </div>
      </>
  )
}

export default ShowSubject;
