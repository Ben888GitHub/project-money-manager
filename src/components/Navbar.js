import React from 'react';
import {
	Box,
	Flex,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useColorModeValue,
	Stack,
	useColorMode,
	Text,
	useMediaQuery
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useFirebase } from '../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';
function Navbar() {
	const { logout, user, isAuth } = useFirebase();
	const { colorMode, toggleColorMode } = useColorMode();

	const navigate = useNavigate();
	const [isLargerThan800] = useMediaQuery('(min-width: 700px)');
	const handleLogout = async () => {
		try {
			await logout();
			navigate('/');
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<Box bg={useColorModeValue('gray.300', 'gray.900')} px={4}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					{isLargerThan800 && (
						<Text fontWeight={600} fontSize={{ lg: 'xl', md: 'xl', sm: 'xl' }}>
							Money Manager Pro
						</Text>
					)}

					<Flex alignItems={'center'}>
						<Stack direction={'row'} spacing={7}>
							<Button onClick={toggleColorMode}>
								{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
							</Button>
							{isAuth && (
								<Box>
									<Menu>
										<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
											{localStorage.getItem('authUserName')}
										</MenuButton>

										<MenuList>
											<MenuItem onClick={handleLogout}>Log out</MenuItem>
										</MenuList>
									</Menu>
								</Box>
							)}
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}

export default Navbar;
