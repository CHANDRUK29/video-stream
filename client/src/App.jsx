import CardMedia from '@mui/material/CardMedia';

const App = () => {
  return (
    <>
      <h1>Test</h1>
      {/* <CardMedia src='http://localhost:6000/videos/'>

      </CardMedia> */}
      <video width='480' height='240' controls autoPlay>
        <source src="https://www.youtube.com/watch?v=gk6Jri1kGTs"
          type='video/mp4' />
        Your browser does not support video
      </video>
    </>
  )
}

export default App