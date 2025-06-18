import React, { useRef } from 'react';

const ScreenShare = () => {
    const videoRef = useRef(null);

    const startScreenShare = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true
            });
            videoRef.current.srcObject = stream;
        } catch (err) {
            console.error('Error sharing screen:', err);
        }
    };

    return (
        <div>
            <button onClick={startScreenShare}>Share Screen</button>
            <video ref={videoRef} autoPlay style={{ width: '600px', border: '1px solid black' }} />
        </div>
    );
};

export default ScreenShare;
