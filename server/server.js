const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());


app.get('/test', (req, res) => res.send('it is healthy'))

app.get('/videos', (req, res) => {
    try {
        const filePath = 'videos/video1.mp4'
        // const filePath = 'videos/video2.mp4'
        if (!filePath) return res.status(404).json({ message: "file not found" })

        //The fs.stat()==> function synchronously retrieves information about a file or directory
        const stat = fs.statSync(filePath);
        //file size 
        const fileSize = stat.size;
        //finding range
        const range = req.headers.range;
        //from range ==> we have to fetch parts from parts ==> we can get start and end

        if (range) {
            //usually range will be ==> bytes=200-1000,2000-6576,19000- etc...
            // we need to remove bytes and get start and end
            const parts = range.replace('/bytes=/', '').split('-');
            console.log(parts);
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            const chunckSize = end - start + 1

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


const PORT = 5500;
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})