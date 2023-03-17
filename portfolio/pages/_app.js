import '@/styles/globals.css'

/* Core CSS required for Ionic components to work properly */
// import '@ionic/core/css/core.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  
  return (<>
    <Component {...pageProps} />
    <ToastContainer autoClose={2000} />
  </>)
}
