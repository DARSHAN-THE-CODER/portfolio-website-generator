import React from 'react'
// import "@lottiefiles/lottie-player";
// import { LottiePlayer } from '@lottiefiles/lottie-player';

import dynamic from 'next/dynamic';

// const LottiePlayer = dynamic(() => import('@lottiefiles/lottie-player'), { ssr: false });
import { Player, Controls } from '@lottiefiles/react-lottie-player';

function Loader({ title, description, src= "https://assets10.lottiefiles.com/packages/lf20_pWTOxQsYjN.json" }) {
    // useEffect(() => {
    //     import('@lottiefiles/lottie-player');
    // });

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-black opacity-70 flex flex-col items-center justify-center">
            {/* <div className="animate-spin  rounded-full  border-t-4 xd border-gray-200 h-12 w-12 mb-4"></div> */}
            {/* <LottiePlayer
                autoplay
                controls
                loop
                mode="normal"
                src="https://assets6.lottiefiles.com/packages/lf20_pWTOxQsYjN.json"
                // style={{"width": "320px"}}
            >
            </LottiePlayer> */}

            <Player
                autoplay
                loop
                src = {src}
                style={{ height: '300px', width: '300px' }}
            >
                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
            <h2 className="text-center xd text-white text-2xl font-semibold">{title ? title : "Saving..."}</h2>
            <p className="xd  text-center text-white">{description ? description : "Hang on just a moment while we save your details. Thank you for your patience!"}</p>
        </div>
    )
}

export default Loader