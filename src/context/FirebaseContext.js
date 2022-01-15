import { createContext, useContext, useEffect, useState } from 'react';

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
	GoogleAuthProvider,
	signInWithPopup
} from 'firebase/auth';
import {
	getDocs,
	onSnapshot,
	collection,
	deleteDoc,
	doc,
	query,
	where,
	addDoc
} from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useToast } from '@chakra-ui/react';

const FirebaseContext = createContext();

export default function FirebaseContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [transactions, setTransactions] = useState([]);
	const [amount, setAmount] = useState(1);
	const [category, setCategory] = useState('');
	const [type, setType] = useState('Income');
	const [startDate, setStartDate] = useState(new Date());
	const [userBalance, setUserBalance] = useState(0);
	const [totalIncome, setTotalIncome] = useState(0);
	const [totalExpense, setTotalExpense] = useState(0);

	const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
	const [authUserId, setAuthUserId] = useState(
		localStorage.getItem('authUserId') || ''
	);

	const toast = useToast();

	// Transactions Collection in your Firestore
	const transactionsCollectionRef = collection(db, 'transactions');

	// Local Storage to store authenticated user data
	const authLocalStorage = (authUser) => {
		localStorage.setItem('isAuth', true);
		localStorage.setItem('authUserName', authUser.user.displayName);
		localStorage.setItem('authUserEmail', authUser.user.email);
		localStorage.setItem('authUserPhoto', authUser.user.photoURL);
		localStorage.setItem('authUserId', authUser.user.uid);
		console.log(authUser);
		setAuthUserId(authUser.user.uid);
	};
	// console.log(auth.currentUser.uid);
	// Invalid Auth Message
	const invalidAuthMessage = () => {
		toast({
			title: 'Authentication Error',
			description: 'Invalid email or password',
			status: 'error',
			duration: 2000,
			isClosable: true
		});
	};

	// Account Created Message
	const accountCreatedMessage = (firstName, lastName) => {
		toast({
			title: `Account created for ${firstName} ${lastName}`,
			description: "We've created your account for you.",
			status: 'success',
			duration: 2000,
			isClosable: true
		});
	};

	// Login
	const login = async (email, password) => {
		try {
			const authUser = await signInWithEmailAndPassword(auth, email, password);
			await authLocalStorage(authUser);

			setIsAuth(true);
		} catch (error) {
			console.log(error.message);

			invalidAuthMessage();
		}
	};

	// Sign in with Google Function
	const googleSignIn = async () => {
		const googleAuthProvider = new GoogleAuthProvider();
		const authUser = await signInWithPopup(auth, googleAuthProvider);
		await authLocalStorage(authUser);
		setIsAuth(true);
	};

	// Sign up for an account
	const signup = async (email, password, firstName, lastName) => {
		try {
			const authUser = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			await updateProfile(auth.currentUser, {
				displayName: `${firstName} ${lastName}`
			}).then(() => {
				authLocalStorage(authUser);
				setIsAuth(true);
				accountCreatedMessage(firstName, lastName);
			});
		} catch (error) {
			console.log(error.message);
			invalidAuthMessage();
		}
	};

	// Logout
	const logout = async () => {
		let keysToRemove = [
			'isAuth',
			'authUserName',
			'authUserEmail',
			'authUserPhoto',
			'authUserId'
		];

		await signOut(auth);
		keysToRemove.forEach((key) => localStorage.removeItem(key));

		setIsAuth(false);
		setUser(null);
		setAuthUserId('');
	};

	// Create a transaction
	const createTransaction = async (amount, category, date, type) => {
		const transaction = {
			amount,
			category,
			date,
			type,
			author: {
				id: localStorage.getItem('authUserId'),
				name: localStorage.getItem('authUserName')
			}
		};
		await addDoc(transactionsCollectionRef, transaction);
	};

	// Delete a transaction
	const deleteTransaction = async (id) => {
		await deleteDoc(doc(db, 'transactions', id));
	};

	// Count User Balance
	const countUserBalance = (doc) => {
		const allIncome = doc.docs
			.filter((doc) => doc.data().type === 'Income')
			.map((doc) => ({ ...doc.data() }))
			.reduce((total, value) => total + Number(value.amount), 0);

		const allExpense = doc.docs
			.filter((doc) => doc.data().type === 'Expense')
			.map((doc) => ({ ...doc.data() }))
			.reduce((total, value) => total + Number(value.amount), 0);

		console.log(`Income - ${allIncome}`);
		console.log(`Expense - ${allExpense}`);
		console.log(`Balance - ${allIncome - allExpense}`);
		setUserBalance(allIncome - allExpense);
		setTotalIncome(allIncome);
		setTotalExpense(allExpense);
	};

	// Get transactions based on the authenticated user
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(transactionsCollectionRef, where('author.id', '==', authUserId)),
			(doc) => {
				countUserBalance(doc);

				setTransactions(doc.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			}
		);

		return () => unsubscribe();
	}, [authUserId]);

	return (
		<FirebaseContext.Provider
			value={{
				user,
				isAuth,
				login,
				signup,
				googleSignIn,
				logout,
				transactions,
				createTransaction,
				deleteTransaction,
				amount,
				setAmount,
				category,
				setCategory,
				type,
				setType,
				startDate,
				setStartDate,
				userBalance,
				totalIncome,
				totalExpense
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
}

export function useFirebase() {
	return useContext(FirebaseContext);
}
