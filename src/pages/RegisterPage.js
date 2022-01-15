import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Text,
	chakra,
	InputGroup,
	HStack,
	InputRightElement
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import AuthHeading from '../components/AuthHeading';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';

function RegisterPage() {
	const { signup } = useFirebase();
	const [showPassword, setShowPassword] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();

		await signup(email, password, firstName, lastName);

		navigate('/home');
	};

	return (
		<chakra.form onSubmit={handleSignUp}>
			<Navbar />
			<AuthHeading>
				<Stack spacing={4}>
					<HStack>
						<Box>
							<FormControl id="firstName" isRequired>
								<FormLabel>First Name</FormLabel>
								<Input
									onChange={(e) => setFirstName(e.target.value)}
									type="text"
								/>
							</FormControl>
						</Box>
						<Box>
							<FormControl id="lastName">
								<FormLabel>Last Name</FormLabel>
								<Input
									onChange={(e) => setLastName(e.target.value)}
									type="text"
								/>
							</FormControl>
						</Box>
					</HStack>
					<FormControl id="email" isRequired>
						<FormLabel>Email address</FormLabel>
						<Input onChange={(e) => setEmail(e.target.value)} type="email" />
					</FormControl>
					<FormControl id="password" isRequired>
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<Input
								onChange={(e) => setPassword(e.target.value)}
								type={showPassword ? 'text' : 'password'}
							/>
							<InputRightElement h={'full'}>
								<Button
									variant={'ghost'}
									onClick={() =>
										setShowPassword((showPassword) => !showPassword)
									}
								>
									{showPassword ? <ViewIcon /> : <ViewOffIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>
					<Stack spacing={10} pt={2}>
						<Button
							type="submit"
							loadingText="Submitting"
							size="lg"
							bg={'blue.400'}
							color={'white'}
							_hover={{
								bg: 'blue.500'
							}}
						>
							Sign up
						</Button>
					</Stack>
					<Stack pt={6}>
						<Text align={'center'}>
							Already a user? <Link to="/">Login</Link>
						</Text>
					</Stack>
				</Stack>
			</AuthHeading>
		</chakra.form>
	);
}

export default RegisterPage;
