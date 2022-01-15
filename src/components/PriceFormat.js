import React from 'react';
import NumberFormat from 'react-number-format';

function PriceFormat({ value }) {
	return (
		<NumberFormat
			value={value}
			displayType={'text'}
			thousandSeparator={true}
			prefix={'$'}
		/>
	);
}

export default PriceFormat;
