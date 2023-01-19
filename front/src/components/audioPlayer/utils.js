import axios from "axios";

export const formatTime = (time) => {
    if (typeof time !== 'number') {
        return '';
    }

    const hrs = Math.floor((time / 3600));
    const mins = Math.floor((time % 3600) / 60);
    const secs =Math.floor(time % 60);

    let ret = '';
    if (hrs > 0) {
        ret += `${hrs}:${mins < 10 ? '0': ''}`
    }

    ret += `${mins}:${secs < 10 ? '0': ''}`;
    ret += `${secs}`;
    return ret;
}

export const getMeta = async (link) => {
    try {
        const response = await axios.get(`http://192.168.1.5:5000/api/audio/meta/${link}`);
        return ({
            image: response.data.videoDetails.thumbnails[response.data.videoDetails.thumbnails.length - 1],
            title: response.data.videoDetails.title
        });
    } catch(error) {
        return null;
    }
}

export const getAudio = async (link) => {
    try {
        const response = await axios.get(`http://192.168.1.5:5000/api/audio/download/${link}`);
        return response.data;
    }
    catch(error) {
        return null;
    }
}
