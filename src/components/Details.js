import React from 'react';
import { Heading } from '@chakra-ui/react';
import { useFirebase } from '../context/FirebaseContext';
import PriceFormat from './PriceFormat';
import useTransactions from './useTransactions';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

function Details({ title }) {
	const options = {
		plugins: {
			legend: {
				labels: {
					font: {
						size: 15
					},
					padding: 30,
					// color: 'black',
					color:
						localStorage.getItem('chakra-ui-color-mode') === 'dark'
							? 'white'
							: 'grey'
				},
				position: 'left' // default is top,
			},
			tooltip: {
				bodyFont: {
					size: 18
					// style: 'bold'
				},
				bodyAlign: 'center'
			}
		}
	};
	const { totalIncome, totalExpense } = useFirebase();
	const { chartData } = useTransactions(title);

	return (
		<>
			<Heading lineHeight={1.1} fontSize={{ base: 'xl', md: '3xl', lg: '3xl' }}>
				{title},{' '}
				<PriceFormat value={title === 'Income' ? totalIncome : totalExpense} />
			</Heading>
			<Doughnut data={chartData} options={options} />
		</>
	);
}

export default Details;
