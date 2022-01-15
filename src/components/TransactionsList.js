import React, { useEffect, useState } from 'react';
import {
	Box,
	Divider,
	Text,
	HStack,
	List,
	ListItem,
	ListIcon,
	IconButton
} from '@chakra-ui/react';
import { MdMoneyOffCsred } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { useFirebase } from '../context/FirebaseContext';
import PriceFormat from './PriceFormat';
import './TransactionList.css';
function TransactionsList() {
	const { transactions, deleteTransaction } = useFirebase();

	return (
		<Box p={5} my={4} w="full">
			<List
				className="list-content"
				h={{ lg: 450, md: 450, sm: 220, base: 190 }}
				// overflowY="auto"
				spacing={3}
				// m={-2}
			>
				{transactions.length > 0 ? (
					transactions.map((transaction, idx) => (
						<Box key={idx}>
							<ListItem
								w={300}
								pr={{ lg: 'full', md: 'full', sm: 'full', base: 4 }}
								mb={2}
							>
								<HStack>
									<IconButton
										colorScheme={
											transaction.type === 'Income' ? 'green' : 'red'
										}
										style={{ fontSize: 22 }}
										icon={<MdMoneyOffCsred />}
										isRound="true"
									/>

									<Text
										style={{ marginLeft: 12 }}
										fontWeight={600}
										fontSize={{ lg: 'lg', md: 'lg', sm: 'md' }}
									>
										{transaction.category}
										<br />
										<Text
											as="span"
											color="gray.400"
											fontWeight={500}
											fontSize={{ lg: 'md', md: 'md', sm: 'sm' }}
										>
											<PriceFormat value={transaction.amount} /> -{' '}
											{transaction.date}
										</Text>
									</Text>

									<IconButton
										style={{ marginLeft: 'auto' }}
										icon={<FaTrashAlt />}
										isRound="true"
										onClick={() => deleteTransaction(transaction.id)}
									/>
								</HStack>
							</ListItem>
							<Divider />
						</Box>
					))
				) : (
					<Text>No Transactions</Text>
				)}
			</List>
		</Box>
	);
}

export default TransactionsList;
