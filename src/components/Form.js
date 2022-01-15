import React, { useState } from 'react';
import {
	Box,
	FormControl,
	FormLabel,
	Stack,
	Button,
	Heading,
	HStack,
	Select,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	NumberInput,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@chakra-ui/react';
import { useFirebase } from '../context/FirebaseContext';
import { incomeCategories, expenseCategories } from '../categories';
import PriceFormat from './PriceFormat';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

function Form() {
	const {
		amount,
		setAmount,
		category,
		setCategory,
		type,
		setType,
		startDate,
		setStartDate,
		createTransaction,
		userBalance
	} = useFirebase();

	const handleDayClick = (day) => {
		setStartDate(day);
	};

	const handleCreateTransaction = async () => {
		await createTransaction(
			amount,
			category,
			startDate.toLocaleDateString(),
			type
		);
	};

	// const [categories, setCategories] = useState(type === 'Income' ? incomeCategories : expenseCategories)

	const selectedCategories =
		type === 'Income' ? incomeCategories : expenseCategories;

	return (
		<Box p={6} maxW={'md'} w="full">
			<Heading
				mb={5}
				lineHeight={1.1}
				fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
			>
				Total Balance: <PriceFormat value={userBalance} />
			</Heading>

			<Stack my={3} spacing={5}>
				<FormControl>
					<FormLabel>Type</FormLabel>
					<Select
						value={type}
						variant="filled"
						id="type"
						onChange={(e) => setType(e.target.value)}
					>
						<option>Income</option>
						<option>Expense</option>
					</Select>
				</FormControl>
				<FormControl>
					<FormLabel>Category</FormLabel>
					<Select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						placeholder="Select Category"
						variant="filled"
						id="category"
					>
						{selectedCategories.map((income, idx) => (
							<option key={idx}>{income.type}</option>
						))}
					</Select>
				</FormControl>
				<HStack>
					<FormControl>
						<FormLabel>Amount</FormLabel>
						<NumberInput
							onChange={(e) => {
								setAmount(e);
							}}
							value={amount}
							min={1}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>
					<FormControl>
						<FormLabel>Date</FormLabel>

						<Popover>
							<PopoverTrigger>
								<Input
									value={startDate.toLocaleDateString()}
									onChange={(e) => {
										console.log(e);
									}}
								/>
							</PopoverTrigger>
							<PopoverContent>
								<DayPicker
									onDayClick={handleDayClick}
									selectedDays={startDate}
								/>
							</PopoverContent>
						</Popover>
					</FormControl>
				</HStack>
				<Stack spacing={5}>
					<Button
						spacing="5"
						mt={5}
						bg={'blue.400'}
						color={'white'}
						_hover={{
							bg: 'blue.500'
						}}
						onClick={handleCreateTransaction}
						isDisabled={
							type === '' || amount === '' || category === '' ? true : false
						}
					>
						CREATE
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
}

export default Form;
