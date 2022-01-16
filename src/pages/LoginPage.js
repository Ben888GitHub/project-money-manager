import React, { useState, useEffect } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	chakra,
	Divider,
	SimpleGrid,
	InputGroup,
	HStack,
	InputRightElement,
	Container,
	useColorModeValue
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import AuthHeading from '../components/AuthHeading';
import { useFirebase } from '../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
	const { isAuth, login } = useFirebase();
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleLogIn = async (e) => {
		e.preventDefault();

		await login(email, password);
		navigate('/home');
	};

	return (
		<>
			<Navbar />
			<chakra.form onSubmit={handleLogIn}>
				<Box bg={useColorModeValue('gray.100', 'gray.800')}>
					<Container
						// bg={useColorModeValue('gray.100', 'gray.800')}
						// maxW="container.xl"
						centerContent
					>
						<AuthHeading>
							<Stack spacing={4}>
								<FormControl id="email">
									<FormLabel>Email address</FormLabel>
									<Input
										onChange={(e) => setEmail(e.target.value)}
										name="email"
										type="email"
										autoComplete="email"
										required
									/>
								</FormControl>
								<FormControl id="password">
									<FormLabel>Password</FormLabel>
									<InputGroup>
										<Input
											onChange={(e) => setPassword(e.target.value)}
											type={showPassword ? 'text' : 'password'}
											autoComplete="current-password"
											required
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
								<Stack spacing={5}>
									<Stack
										direction={{ base: 'column', sm: 'row' }}
										align={'start'}
										justify={'space-between'}
									></Stack>
									<Button
										type="submit"
										bg={'blue.400'}
										color={'white'}
										_hover={{
											bg: 'blue.500'
										}}
									>
										Sign in
									</Button>
								</Stack>
							</Stack>
						</AuthHeading>
					</Container>
				</Box>
			</chakra.form>
		</>
	);
}

export default LoginPage;
