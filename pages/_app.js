import '../styles/globals.scss';
import AppContext from '../context/context';
import { useReducer } from 'react';
import { appReducer } from '../functions/reducer';
import { toast, ToastContainer } from 'react-toastify';
import { toastOptions } from '../const/const';

import 'react-toastify/dist/ReactToastify.css';
import 'reactjs-popup/dist/index.css';
import 'ms-react-progress-bar/dist/ProgressBar.css';

function MyApp({ Component, pageProps }) {
	const [ state, dispatch ] = useReducer(appReducer, []);

	const notify = (message, status) => {
		status === 'error' ? toast.error(message, toastOptions) : toast.success(message.toastOptions);
	};

	return (
		<AppContext.Provider value={{ state, dispatch, notify }}>
			<Component {...pageProps} />
			<ToastContainer />
		</AppContext.Provider>
	);
}

export default MyApp;
