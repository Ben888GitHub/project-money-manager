import React from 'react';
import {
	Container,
	Box,
	Stack,
	Divider,
	Flex,
	useColorModeValue
} from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import Form from '../components/Form';
import TransactionsList from '../components/TransactionsList';
import Details from '../components/Details';
function HomePage() {
	return (
		<Box m={0} p={0} overflowX="hidden">
			<Navbar />
			<Box bg={useColorModeValue('gray.100', 'gray.800')}>
				<Container maxW="container.xl" centerContent>
					<Flex minH={'50vh'} align={'center'} justify={'center'}>
						<Stack
							direction={{
								lg: 'row',
								md: 'row',
								sm: 'column',
								base: 'column'
							}}
							bg={useColorModeValue('white', 'gray.700')}
							rounded={'xl'}
							boxShadow={'lg'}
							p={{ lg: 5, md: 5, sm: 3, base: 3 }}
							my={12}
							h={{ lg: 540, md: 540, sm: 720, base: 720 }}
						>
							<Form />
							<Divider orientation="vertical" />
							<TransactionsList />
						</Stack>
					</Flex>
					<Flex
						align={'center'}
						justify={'center'}
						// bg={useColorModeValue('gray.100', 'gray.800')}
						// delete this
						pb={10}
					>
						<Stack
							direction={{
								lg: 'row',
								md: 'column',
								sm: 'column',
								base: 'column'
							}}
							spacing="30px"
						>
							<Box
								rounded={'xl'}
								boxShadow={'lg'}
								bg={useColorModeValue('white', 'gray.700')}
								w={{ lg: '540px', md: '540px', sm: '450px', base: '340px' }}
								p={6}
								// h="650px"
							>
								<Details title="Income" />
							</Box>
							<Box
								rounded={'xl'}
								boxShadow={'lg'}
								bg={useColorModeValue('white', 'gray.700')}
								w={{ lg: '540px', md: '540px', sm: '450px', base: '340px' }}
								p={6}
								// h="650px"
							>
								<Details title="Expense" />
							</Box>
						</Stack>
					</Flex>
				</Container>
			</Box>
		</Box>
	);
}

export default HomePage;
