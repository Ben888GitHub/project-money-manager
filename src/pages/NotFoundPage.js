import React from 'react';
import { Container, Flex, Heading } from '@chakra-ui/react';

function NotFoundPage() {
	return (
		<Container maxW="container.xl" centerContent>
			<Flex
				// minH={'100vh'}
				minH={'10vh'}
				align={'center'}
				justify={'center'}
			>
				<Heading fontSize={'4xl'} textAlign={'center'}>
					Page Not Found
				</Heading>
			</Flex>
		</Container>
	);
}

export default NotFoundPage;
