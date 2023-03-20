import '@/styles/globals.css'
import { useEffect } from 'react';
/* Core CSS required for Ionic components to work properly */
// import '@ionic/core/css/core.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAnalytics, logEvent } from "firebase/analytics";

import { app } from '@/utils/firebase'; 
import { useRouter } from 'next/router';
export default function App({ Component, pageProps }) {
  
  const router = useRouter();
  useEffect(() => {
    // if (analytics) {
    // if (process.env.NODE_ENV === "production") {
      // analytics();
      const logEventx = (url) => {
        logEvent(getAnalytics(app), "screen_view");
      };
      router.events.on("routeChangeComplete", logEventx);
      // //For First Page
      if (window && window.location) {
        logEventx(window.location.pathname);
      }
      // }
      return () => {
        router.events.off("routeChangeComplete", logEventx);
      };
    // }
  }, []);

  return (<>
    <Component {...pageProps} />
    <ToastContainer autoClose={2000} />
  </>)
}
