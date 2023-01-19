import React, { useEffect, useRef, useState } from "react";
import { formatTime, getAudio } from "./utils";
import 'styles/audioPlayer/AudioPlayer.scss';

export default function AudioPlayer() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [mediaTime, setMediaTime] = useState(0);

    const togglePlayer = (event) => {
        setIsPlaying(!isPlaying);
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        isPlaying ? event.target.id = '' : event.target.id = 'pause'
    }

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    }

    const handleTimeUpdate = () => {
        setMediaTime(audioRef.current.currentTime);
    }

    const handleScrubberChange = (event) => {
        const newTime = event.target.value;
        setMediaTime(newTime);
        audioRef.current.currentTime = newTime;
    }

    const handleSkipForward = (event) => {
        const { currentTime } = audioRef.current;
        const newTime = currentTime + 15;
        setMediaTime(newTime);
        audioRef.current.currentTime = newTime;
    }

    const handleSkipBackward = (event) => {
        if (mediaTime > 15) {
            const { currentTime } = audioRef.current;
            const newTime = currentTime - 15;
            setMediaTime(newTime);
            audioRef.current.currentTime = newTime;
        }
        else {
            setMediaTime(0);
            audioRef.current.currentTime = 0;
        }
    }

    return (
        <div className="AudioPlayer">
            <div className="meta">
                <h2 className="title" id="metaTitle">{localStorage.getItem('title') || 'Loading...' }</h2>
                {
                    localStorage.getItem('image') ? 
                        <img className="image" id="set" src={localStorage.getItem('image')} /> :
                        <h2 className="image">Loading...</h2>
                }
            </div>

            <div className="timeControl">
                <div className="duration">
                    <span className="durationDisplayer elapsedTime">{formatTime(mediaTime)}</span>
                    <span className="durationDisaplayer totalTime">{formatTime(duration)}</span>
                </div>
                <input
                    type="range" className="durationScrubber"
                    min={0} max={duration} value={mediaTime}
                    onChange={handleScrubberChange}
                />
            </div>
            <div className="controllers">
                <span className="skip backward material-symbols-outlined" onClick={handleSkipBackward}>skip_previous</span>
                <button className="playBtn material-symbols-outlined" onClick={togglePlayer}>{isPlaying ? 'pause' : 'play_arrow'}</button>
                <span className="skip forward material-symbols-outlined" onClick={handleSkipForward}>skip_next</span>
            </div>
            <a className="downloadBtn" href={`http://192.168.1.5:5000/api/audio/save/${localStorage.getItem('videoID')}`} target="_blank" >Download File</a>

            <audio
                controls
                id="audioElement"
                ref={audioRef}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                src={`http://192.168.1.5:5000/api/audio/download/${localStorage.getItem('videoID')}` || null}
            ></audio>
        </div>
    )
}