import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TestEnvironment() {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);
    const [stream, setStream] = useState(null);
    const [videoAccessed, setVideoAccessed] = useState(false);
    const [audioAccessed, setAudioAccessed] = useState(false);
    const navigate = useNavigate();

    const accessMedia = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play(); // Ensure the video plays automatically
            }
            setStream(mediaStream);
            setVideoAccessed(true);
            setAudioAccessed(true);
        } catch (err) {
            setError('Permission to access camera/microphone was denied');
        }
    };

    const revokeMediaAccess = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }
    };

    const handleStartTest = () => {
        revokeMediaAccess();
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Test Environment Check</h1>
            </div>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : stream ? (
                <>
                    <div className="w-72 h-48 mb-4 relative">
                        <video
                            ref={videoRef}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            autoPlay
                            muted // Ensure it's muted if needed
                        />
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                checked={videoAccessed}
                                readOnly
                                className={`appearance-none w-5 h-5 rounded-full border-2 border-black ${videoAccessed ? 'bg-green-500' : 'bg-red-500'}`}
                            />
                            <span className="text-gray-700">Camera Accessed</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                checked={audioAccessed}
                                readOnly
                                className={`appearance-none w-5 h-5 rounded-full border-2 border-black ${audioAccessed ? 'bg-green-500' : 'bg-red-500'}`}
                            />
                            <span className="text-gray-700">Microphone Accessed</span>
                        </label>
                    </div>
                    <button
                        onClick={handleStartTest}
                        className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                    >
                        Start Test
                    </button>
                </>
            ) : (
                <button
                    onClick={accessMedia}
                    className="px-6 py-3 bg-green-500 text-white font-bold rounded hover:bg-green-600"
                >
                    Start Environment Check
                </button>
            )}
        </div>
    );
}

export default TestEnvironment;
