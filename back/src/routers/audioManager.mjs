import express from "express";
import expressAsyncHandler from "express-async-handler";

import fs from 'fs';
import ytdl from "ytdl-core";
import path from 'path';

const __dirname = path.resolve();

const audioRouter = express.Router();

audioRouter.get('/download/:link', expressAsyncHandler(async (req, res) => {
    const stream = ytdl(req.params.link, {
        filter: 'audioonly',
        format: 'mp3'
    });

    stream.on('info', data => {
        if (fs.existsSync(`./assets/${data.videoDetails.title}.mp3`)) {
            res.sendFile(path.resolve(__dirname, `assets/${data.videoDetails.title}.mp3`))
        }
        else {
            stream.pipe(fs.createWriteStream(`./assets/${data.videoDetails.title}.mp3`));

            stream.on('end', () => {
                res.sendFile(path.resolve(__dirname, `assets/${data.videoDetails.title}.mp3`))
            })            
        }
    })

    stream.on('error', error => {
        res.status(500).json({
            error: error.message
        })
    })
}))

audioRouter.get('/meta/:link', expressAsyncHandler(async (req, res) => {
    const stream = ytdl(req.params.link);
    stream.on('info', data => {
        res.status(200).json(data)
    })

    stream.on('error', error => {
        res.status(500).json({
            error: error.message
        })
    })    
}))

audioRouter.get('/save/:link', expressAsyncHandler(async (req, res) => {
    const stream = ytdl(req.params.link);
    stream.on('info', data => {
        if (fs.existsSync(`./assets/${data.videoDetails.title}.mp3`)) {
            res.download(path.resolve(__dirname, `assets/${data.videoDetails.title}.mp3`))
        }
        else {
            stream.pipe(fs.createWriteStream(`./assets/${data.videoDetails.title}.mp3`));

            stream.on('end', () => {
                res.download(path.resolve(__dirname, `assets/${data.videoDetails.title}.mp3`))
            })            
        }
    })
    
    stream.on('error', error => {
        res.status(500).json({
            error: error.message
        })
    })
}))

export default audioRouter;