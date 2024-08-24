const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());


app.get('/health-check', (req, res) => res.send('it is healthy'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// method 1
app.get('/videos', (req, res) => {
    try {
        const filePath = './videos/video2.mp4'
        if (!filePath) return res.status(404).json({ message: "file not found" })

        //The fs.statsync()==> function synchronously retrieves information about a file or directory
        const stat = fs.statSync(filePath);
        //file size 
        const fileSize = stat.size;
        //finding range
        const range = req.headers.range;
        console.log(range)
        //from range ==> we have to fetch parts from parts ==> we can get start and end

        if (range) {
            //usually range will be ==> bytes=200-1000,2000-6576,19000- etc...
            // we need to remove bytes and get start and end
            // const parts = range.replace('/bytes=/', ' ').split('-');
            // console.log(parts);
            const chunckSize = 10 ** 6;
            const start = Number(range.replace(/\D/g, ""))
            console.log(start);
            // const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const end = Math.min(start + chunckSize, fileSize - 1);


            const file = fs.createReadStream(filePath, { start, end });
            //neccessary header options
            const headOpts = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunckSize,
                'Content-Type': 'video/mp4'
            }
            // we are using 206 to say that it is a partial content
            res.writeHead(206, headOpts);
            file.pipe(res)
        } else {
            // if we dont have the range header 

            //neccessary header options because it not a partial response
            const headOpts = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4'
            }
            // we are using 206 to say that it is a partial content
            res.writeHead(200, headOpts);
            fs.createReadStream(filePath).pipe(res);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

})

// method 2
app.get('/videoplayer', (req, res) => {
    //finding range
    //from range ==> we have to fetch parts from parts ==> we can get start and end
    const range = req.headers.range
    console.log("range", range)
    //mentioning the path of video to be played
    const videoPath = './videos/video2.mp4';

    //getting video size and setting chunk size
    //The fs.statsync()==> function synchronously retrieves information about a file or directory
    const videoSize = fs.statSync(videoPath).size
    console.log("videosize", videoSize)
    const chunkSize = 1 * 1e6;

    //usually range will be ==> bytes=200-1000,2000-6576,19000- etc...
    // we need to remove bytes and get start and end
    const start = Number(range.replace(/\D/g, ""))
    console.log("start", start)
    const end = Math.min(start + chunkSize, videoSize - 1)
    console.log("end", start)
    const contentLength = end - start + 1;
    console.log("content length", start)
    //neccessary header options
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }

    // we are using 206 to say that it is a partial content
    res.writeHead(206, headers)
    const stream = fs.createReadStream(videoPath, {
        start,
        end
    })
    stream.pipe(res)
})



const PORT = 5500;
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})

