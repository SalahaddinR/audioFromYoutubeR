import React, { useRef } from "react";
import { getAudio, getMeta } from "./utils";
import 'styles/audioPlayer/AudioDownloader.scss';
import { useNavigate } from "react-router-dom";

export default function AudioDownloader() {
    const linkField = useRef(null);
    const errorField = useRef(null);
    const navigator = useNavigate();

    const submitLink = async (event) => {
        if (linkField.current.value === '') {
            errorField.current.innerText = 'Link field cannot be blank!';
            setTimeout(
                async () => {
                    errorField.current.innerText = '';
                }, 3000
            )
        }
        else {
            const meta = await getMeta(linkField.current.value);

            if (meta) {
                localStorage.clear();

                localStorage.setItem('title', meta.title);
                localStorage.setItem('image', meta.image.url);
                localStorage.setItem('videoID', linkField.current.value);
                navigator('/play');
            }
        }
    }

    return (
        <div className="AudioDownloader">
            <h2 className="title">
                Download audio from <span>Youtube</span> or Listen online 
            </h2>
            <div className="inputGroup">
                <input type="text" id="videoLink" name="videoLink" className="textField" placeholder="Paste Youtube Video ID or Link" ref={linkField}/>
                <button className="submitBtn" onClick={submitLink}>Ready</button>
            </div>
            <div className="errorMessage" ref={errorField}></div>
        </div>
    )
}