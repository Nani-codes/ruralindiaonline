import BaseQuote from '../Base/BaseQuote';
import BaseText from '../Base/BaseText';
import { Paper, Space } from '@mantine/core';

const TextWithQuote = ({ quote, text }: TextWithQuoteProps) => {
	return (
		<Paper m='auto' bg='#F4F4F4' w={{ base: '20rem', sm: '40rem' }}>
			<BaseText text={text} />
			<BaseQuote quote={quote} />
		</Paper>
	);
};

export default TextWithQuote;
