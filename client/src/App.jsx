

const App = () => {
  return (
    <>
      {/* <h1>Test</h1> */}
        <p>videos</p>
      <video width='540' height='360' controls autoPlay>
        <source src="http://localhost:5500/videos"
          type='video/mp4' />
        Your browser does not support video
      </video>
        <p>videoplayer</p>
      <video width='540' height='360' controls autoPlay>
        <source src="http://localhost:5500/videoplayer"
          type='video/mp4' />
        Your browser does not support video
      </video>

      {/* <video src="http://localhost:5500/video-stream" width="1080px"
        controls></video> */}
    </>
  )
}

export default App