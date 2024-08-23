

const App = () => {
  return (
    <>
      <h1>Test</h1>
      {/* <div> */}
        <p>video-stream</p>
      <video width='480' height='240' controls autoPlay>
        <source src="http://localhost:5500/video-stream"
          type='video/mp4' />
        Your browser does not support video
      </video>

      {/* </div> */}
      {/* <div> */}
        <p>videos</p>
      <video width='480' height='240' controls autoPlay>
        <source src="http://localhost:5500/videos"
          type='video/mp4' />
        Your browser does not support video
      </video>
      {/* </div> */}

      {/* <div> */}
        <p>videoplayer</p>
      <video width='480' height='240' controls autoPlay>
        <source src="http://localhost:5500/videoplayer"
          type='video/mp4' />
        Your browser does not support video
      </video>
      {/* </div> */}

      {/* <video src="http://localhost:5500/video-stream" width="1080px"
        controls></video> */}
    </>
  )
}

export default App