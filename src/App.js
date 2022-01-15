import React, { useState, useEffect } from 'react';

import { Box, useColorModeValue } from '@chakra-ui/react';
import {
	Routes,
	Route,
	Outlet,
	Link,
	useNavigate,
	useParams,
	useLocation
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import FirebaseContextProvider from './context/FirebaseContext';
import { useFirebase } from './context/FirebaseContext';
function App() {
	return (
		<FirebaseContextProvider>
			<Routes>
				<Route
					path="/home"
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route path="/" element={<LoginPage />} />
				<Route path="/signup" element={<RegisterPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</FirebaseContextProvider>
	);
}

function ProtectedRoute({ children }) {
	const { isAuth } = useFirebase();
	let navigate = useNavigate();

	useEffect(() => {
		if (!isAuth) {
			navigate('/');
		}
	}, []);

	return children; // children are every component placed under this ProtectedRoute
}

export default App;
