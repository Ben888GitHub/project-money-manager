import React, { useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import {
	incomeCategories,
	expenseCategories,
	resetCategories
} from '../categories';

function useTransactions(title) {
	resetCategories();
	const { transactions } = useFirebase();

	const filteredTransactions = transactions.filter(
		(transaction) => transaction.type === title
	);

	const categories = title === 'Income' ? incomeCategories : expenseCategories;

	// Update Categories amount
	filteredTransactions.map((transaction) => {
		const category = categories.find(
			(category) => category.type === transaction.category
		);
		// console.log(category);
		if (category) category.amount += Number(transaction.amount);
	});

	const filteredCategories = categories.filter((sc) => sc.amount > 0);
	// console.log(filteredCategories);

	const chartData = {
		labels: filteredCategories.map((c) => c.type),
		datasets: [
			{
				data: filteredCategories.map((c) => Number(c.amount)),
				backgroundColor: filteredCategories.map((c) => c.color)
			}
		]
	};

	return { chartData };
}

export default useTransactions;
