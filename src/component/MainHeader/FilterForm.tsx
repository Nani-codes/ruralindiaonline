import { Selected } from '@/pages/library';
import Link from 'next/link';
import Autocomplete from 'react-autocomplete';
import { BASE_URL } from '@/config';
import { Label } from '../Text';
import styles from './MainHeader.module.css';
import { useState } from 'react';
import axios from 'axios';
import { debounce } from '@/hooks/debounce';

const date = [
	{ name: 'Past 7 days', value: 7 },
	{ name: 'Past 14 days', value: 14 },
	{ name: 'Past 30 days', value: 30 },
	{ name: 'Past 1 year', value: 365 },
];
const cType = [
	'Articles',
	//"Editorials",
	'Video',
	'Audio',
	// "Student Articles",
];

function FilterForm(props: any) {
	const [suggestions, setSuggestions] = useState([]);

	const {
		data: { tags,authorName, location, setLocation,setTags, setAuthorName, setDateRange, dateRange, contentType, setContentType },
	} = props;

	const selectDate = (e: any, value: any) => {
		e.preventDefault();
		setDateRange(value.toString());
	};

	const selectType = (e: any, value: any) => {
		e.preventDefault();

		let r = (contentType as string)?.split(',') ?? [];
		if ((contentType as string)?.split(',')?.includes(value?.toString())) {
			r = r.filter((item) => item !== value?.toString());
		} else {
			r.push(value);
		}
		setContentType(r.join(','));
	};

	const handleSelect = (val: any) => {
		setAuthorName(val);
		setSuggestions([]);
	};

	const handleChange = debounce(async (e: any) => {
		if (!e.target.value) {
			setSuggestions([]);
			return;
		}
		try {
			const response = await axios.get(
				` ${BASE_URL}api/authors?filters[Name][$contains]=${e.target.value}`,
			);
			// console.log(response, 'response');
			const data = response.data?.data?.map?.((i: any) => i?.attributes?.Name);
			setSuggestions(data ?? []);
		} catch (error) {
			console.error('Error fetching suggestions:', error);
			setSuggestions([]);
		}
	}, 400);

	return (
		<div className='form'>
			<div className={styles['form-control']}>
				<Label>
					<User />
					Author name
				</Label>
				<div className={styles['input']}>
					<Search />

					<Autocomplete
						getItemValue={(item: any) => item}
						items={suggestions}
						renderItem={(item: any, isHighlighted: any) => (
							<div
								style={{
									background: isHighlighted ? 'var(--color-secondary-bg)' : 'var(--color-nav-bg)',
									padding: 16,
									borderBottom: '1px solid var(--color-border)',
									color: 'var(--color-title)',
								}}>
								{item}
							</div>
						)}
						value={authorName}
						// placeholder="Enter a name of author"
						inputProps={{ placeholder: 'placeholder text' }}
						onChange={(e) => {
							setAuthorName(e.target.value);
							handleChange(e);
						}}
						onSelect={handleSelect}
						wrapperStyle={{
							position: 'relative',
							display: 'inline-block',
							width: '100%',
						}}
						menuStyle={{
							zIndex: 1,
							position: 'fixed',
							overflow: 'auto',
							maxHeight: '40%',
							filter: 'drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1))',
							borderRadius: 12,
						}}
					/>
				</div>
			</div>

			{/* <div style="left: 966.328px; top: 234.695px; min-width: 420.672px; border-radius: 3px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px; background: rgba(255, 255, 255, 0.9); padding: 2px 0px; font-size: 90%; position: fixed; overflow: auto; max-height: 50%;"><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div><div style="background: var(--color-nav-bg); padding: 16px; border-bottom: 1px solid var(--color-border); color: var(--color-title);">hello</div></div> */}
			<div className={styles['divider']} />

			<div className={styles['form-control']}>
				<Label>
					<Place />
					Place
				</Label>
				<div className={styles['input']}>
					<Search />
					<input
						value={location}
						type='text'
						placeholder='Enter a name of place'
						onChange={(e) => setLocation(e.target.value)}
					/>
				</div>
			</div>
			<div className={styles['divider']} />

			<div className={styles['form-control']}>
				<Label>
					<Date />
					Date Range
				</Label>
				<div className={styles['selection-items']}>
					{date.map((item) => (
						<Link href='/' key={item.name} onClick={(e) => selectDate(e, item.value)}>
							{dateRange === item.value?.toString() ? <Selected /> : <Select />}
							{item.name}
						</Link>
					))}
				</div>
			</div>
			<div className={styles['divider']} />

			<div className={styles['form-control']}>
				<Label>
					<File />
					Content type
				</Label>
				<div className={styles['selection-items']}>
					{cType.map((item) => (
						<Link href='/' key={item} onClick={(e) => selectType(e, item)}>
							{(contentType as string)?.split(',')?.includes(item?.toString()) ? <Selected /> : <Select />}
							{item}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

export default FilterForm;

const Select = () => (
	<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H14.2C15.8802 1 16.7202 1 17.362 1.32698C17.9265 1.6146 18.3854 2.07354 18.673 2.63803C19 3.27976 19 4.11984 19 5.8V14.2C19 15.8802 19 16.7202 18.673 17.362C18.3854 17.9265 17.9265 18.3854 17.362 18.673C16.7202 19 15.8802 19 14.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V5.8Z'
			stroke='#828282'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

// const Search = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 14 14"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"
//       stroke="#B82929"
//       strokeWidth="1.2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

const Search = () => (
	<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M17.5 17.5L12.5001 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z'
			stroke='#B82929'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const User = () => (
	<svg width='18' height='20' viewBox='0 0 18 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M17 19C17 17.6044 17 16.9067 16.8278 16.3389C16.44 15.0605 15.4395 14.06 14.1611 13.6722C13.5933 13.5 12.8956 13.5 11.5 13.5H6.5C5.10444 13.5 4.40665 13.5 3.83886 13.6722C2.56045 14.06 1.56004 15.0605 1.17224 16.3389C1 16.9067 1 17.6044 1 19M13.5 5.5C13.5 7.98528 11.4853 10 9 10C6.51472 10 4.5 7.98528 4.5 5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5Z'
			stroke='#B82929'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const Date = () => (
	<svg width='20' height='22' viewBox='0 0 20 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M19 9H1M14 1V5M6 1V5M5.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7202 19 17.8802 19 16.2V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H5.8C4.11984 3 3.27976 3 2.63803 3.32698C2.07354 3.6146 1.6146 4.07354 1.32698 4.63803C1 5.27976 1 6.11984 1 7.8V16.2C1 17.8802 1 18.7202 1.32698 19.362C1.6146 19.9265 2.07354 20.3854 2.63803 20.673C3.27976 21 4.11984 21 5.8 21Z'
			stroke='#B82929'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const Place = () => (
	<svg width='18' height='22' viewBox='0 0 18 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M9 21C10 16 17 15.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 15.4183 8 16 9 21Z'
			stroke='#B82929'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z'
			stroke='#B82929'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const File = () => (
	<svg width='22' height='20' viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M12 5L10.8845 2.76892C10.5634 2.1268 10.4029 1.80573 10.1634 1.57116C9.95158 1.36373 9.69632 1.20597 9.41607 1.10931C9.09916 1 8.74021 1 8.02229 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.0799 1 4.2V5M1 5H16.2C17.8802 5 18.7202 5 19.362 5.32698C19.9265 5.6146 20.3854 6.07354 20.673 6.63803C21 7.27976 21 8.11984 21 9.8V14.2C21 15.8802 21 16.7202 20.673 17.362C20.3854 17.9265 19.9265 18.3854 19.362 18.673C18.7202 19 17.8802 19 16.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V5Z'
			stroke='#B82929'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);
