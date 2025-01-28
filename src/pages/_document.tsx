import { Head, Html, Main, NextScript } from 'next/document';
import { DocumentContext, DocumentInitialProps } from 'next/document';

const Document = ({ lang, dir }: { lang: string; dir: string }) => {
	return (
		<Html lang={lang} dir={dir}>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link href='https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu+UI&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali+UI&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css2?family=Noto+Sans+Gujarati+UI&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada+UI&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam+UI&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css2?family=Noto+Sans+Gurmukhi&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil+UI&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css2?family=Noto+Sans+Oriya&display=swap' rel='stylesheet' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

Document.getInitialProps = async (ctx: DocumentContext) => {
	const initialProps = await ctx.renderPage();

	// Example: Retrieve locale from request headers or custom logic
	let lang = 'en'; // Default language
	let dir = 'ltr'; // Default direction

	const xInvokeQuery = ctx.req?.headers['x-invoke-query'];
	if (xInvokeQuery) {
		try {
			const query = JSON.parse(decodeURIComponent(xInvokeQuery as string));
			lang = query.__nextLocale || 'en';
			dir = lang === 'ur' ? 'rtl' : 'ltr';
		} catch (error) {
			console.error('Error parsing x-invoke-query:', error);
		}
	}

	return { ...initialProps, lang, dir };
};

export default Document;
