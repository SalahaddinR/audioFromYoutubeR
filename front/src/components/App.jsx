import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AudioDownloader from './audioPlayer/AudioDownloader';
import AudioPlayer from './audioPlayer/AudioPlayer';
import 'styles/App.scss';

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<AudioDownloader />} />
                <Route path="/play" element={<AudioPlayer />} />
            </Routes>
        </div>
    )
}