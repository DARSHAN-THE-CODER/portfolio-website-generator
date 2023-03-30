
import { useRouter } from "next/router";

import Head from "next/head";
import { getAnalytics, logEvent } from "firebase/analytics";

import { app } from "@/utils/firebase";

const LandingPage = () => {

    const router = useRouter();

    function handleRegister() {

        logEvent(getAnalytics(app), "clicked register from home");
        
        router.push("/auth/register")
    }
    return (
        <div className="relative flex-col bg-gray w-full h-[90vh] overflow-hidden m-auto flex text-left text-[1rem] text-whitesmoke font-poppins">
            <Head>
                <title>Awesome Portfolio | Build free portfolio website</title>
                <meta name="description" content="Build free portfolio website" />
                <meta name="author" content="Darshan V" />
                <meta property="og:image" content="https://i.ibb.co/vHQFXJK/dv.jpg" />
            </Head>
            <img
                className="absolute top-[0rem] left-[30vw] w-[46.98rem] h-[33.79rem] opacity-[0.8]"
                alt=""
                src="/eclipse.svg"
            />
            <img
                className="absolute top-[28.19rem] left-[52.88rem] w-[37.88rem] h-[37.88rem] opacity-[0.6]"
                alt=""
                src="/eclipse1.svg"
            />
            {/* <img
                className="absolute rotate-90 flex  ml-0 max-w-full overflow-hidden h-[19.05rem] object-cover"
                alt=""
                src="/supertoroidyellowglossy1@2x.png"
            /> */}
            <div className="flex flex-row justify-center pt-10 pb-10 m-auto rounded-3xl [background:linear-gradient(106.51deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.02))] [backdrop-filter:blur(30px)] w-[90vw] h-min md:h-[80vh] overflow-hidden">
                <div className="flex flex-1 gap-6 md:gap-10 flex-col ml-0 m-auto">
                    <b className="ml-0 font-sans text-center text-2xl md:text-5xl">
                        <p className="m-0 ml-4">Your portfolio, your way</p>
                    </b>
                    <div className="xd text-2xl flex font-inter text-center  m-6 ">
                        Build a stunning portfolio website to showcase your skills and stand out from the competition with our Easy-to-use platform.
                    </div>
                    <div className="m-auto flex justify-center text-[1.5rem] font-medium  [-webkit-background-clip:text] bg-gold shadow-[0px_4px_30px_1px_rgba(255,_190,_22,_0.31)] box-border border-solid border-white  w-[16.63rem] h-[3.38rem] cursor-pointer text-center p-2"
                        onClick={() => handleRegister()}
                    >
                        Sign Up Now !!
                    </div>
                </div>
                <figure className="hidden m-auto flex-1 md:flex justify-center h-full">
                    <img src={"/saly13@2x.png"} alt='some image' loading="lazy" />
                </figure>
                {/* <figure className="m-auto flex justify-center">
                    <img src={"/roundcubeorangeglossy@2x.png"} alt='some image' loading="lazy" />
                </figure> */}
            </div>

            {/* <img
                className="mt-auto max-w-full overflow-hidden object-cover"
                alt=""
                src="/roundcubeorangeglossy@2x.png"
            /> */}
        </div>
    );
};

export default LandingPage;
