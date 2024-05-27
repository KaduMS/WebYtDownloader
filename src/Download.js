import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const Download = () => {
    const [url, setUrl] = useState('');
    const [outputDir, setOutputDir] = useState('');
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');

    const handleDownload = async () => {
        setStatus('Downloading...');
        try {
            const response = await axios.post('https://downloaderpy.onrender.com/download', { url, outputDir }, {
                onDownloadProgress: progressEvent => {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                }
            });
            if (response.data.status === 'completed') {
                setStatus('Download completed');
            } else {
                setStatus(`Error: ${response.data.message}`);
            }
        } catch (error) {
            setStatus('Error during download');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h1>YouTube Downloader</h1>
            <h3>Sem ADS (por enquanto)</h3>
            <input
                type="text"
                placeholder="YouTube URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <input
                type="text"
                placeholder="Output Directory"
                value={outputDir}
                onChange={(e) => setOutputDir(e.target.value)}
            />
            <button onClick={handleDownload}>Download</button>
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            <p>{status}</p>
        </div>
    );
};

export default Download;
