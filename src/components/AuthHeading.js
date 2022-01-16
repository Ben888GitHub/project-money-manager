import React, { useEffect } from 'react';
import {
	Text,
	Container,
	Box,
	SimpleGrid,
	Stack,
	Button,
	Flex,
	useColorModeValue,
	Heading,
	Divider
} from '@chakra-ui/react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useFirebase } from '../context/FirebaseContext';
function AuthHeading({ children }) {
	const { googleSignIn, isAuth } = useFirebase();
	let location = useLocation();
	let navigate = useNavigate();

	useEffect(() => {
		if (isAuth) {
			navigate('/home');
		}
	}, []);

	// Sign in with Google
	const handleGoogleSignIn = async (e) => {
		e.preventDefault();

		await googleSignIn();
		navigate('/home');
	};

	return (
		<>
			<Flex minH={'95vh'} align={'center'} justify={'center'}>
				<Stack
					spacing={8}
					mx={'auto'}
					maxW={'lg'}
					py={12}
					px={{ lg: 6, md: 6, sm: 6 }}
				>
					<Stack align={'center'}>
						{location.pathname === '/signup' ? (
							<>
								<Heading fontSize={'4xl'} textAlign={'center'}>
									Sign up
								</Heading>
								<Text fontSize={'lg'} color={'gray.600'}>
									to enjoy all of our cool features
								</Text>
							</>
						) : (
							<>
								<Heading fontSize={'4xl'}>Sign in to continue</Heading>
								<Text fontSize={'lg'} color={'gray.600'}>
									Don't have an account? <Link to="/signup">Sign up</Link>
								</Text>
							</>
						)}
					</Stack>

					<Box
						rounded={'lg'}
						bg={useColorModeValue('white', 'gray.700')}
						boxShadow={'lg'}
						p={8}
					>
						{children}
						<Stack spacing={5}>
							<Flex align="center" color="gray.300" mt="6">
								<Box flex="1">
									<Divider borderColor="currentcolor" />
								</Box>
								<Text
									as="span"
									px="3"
									color={useColorModeValue('gray.600', 'gray.400')}
									fontWeight="medium"
								>
									or
								</Text>
								<Box flex="1">
									<Divider borderColor="currentcolor" />
								</Box>
							</Flex>
							<SimpleGrid mt="6" spacing="3">
								<Button
									onClick={handleGoogleSignIn}
									boxShadow="base"
									color="currentColor"
									// variant="outline"
									variant={useColorModeValue('outline', 'solid')}
									leftIcon={<FcGoogle />}
								>
									<Text as="span">Sign in with Google</Text>
								</Button>
							</SimpleGrid>
						</Stack>
					</Box>
				</Stack>
			</Flex>
		</>
	);
}

export default AuthHeading;
