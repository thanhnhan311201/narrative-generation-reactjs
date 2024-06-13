import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import store from './store';

import App from './App.tsx';

import { GOOGLE_CLIENT_ID } from './config/env/google.config.ts';

import './index.css';
import 'react-tooltip/dist/react-tooltip.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		<Router>
			<Provider store={store}>
				<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
					<App />
				</GoogleOAuthProvider>
			</Provider>
		</Router>
	</>,
);
