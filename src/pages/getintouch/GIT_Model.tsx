import { Button, Card, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import { GIT_Types } from '@/types/getintouch_form';
import { createForm } from '@/lib/GIT_modal';
import UserSquare from '@/common/Icons/User_Square';
import Mail_02 from '@/common/Icons/Mail_02';
import Masseage_Text_Circle from '@/common/Icons/Masseage_Text_Circle';
import PhoneIconRed from '@/common/Icons/phonered';
export default function GetInTouch_Form(props: any) {
	const theme = useMantineTheme();
	const { width } = useViewportSize();

	const form = useForm<GIT_Types>({
		initialValues: {
			name: '',
			email: '',
			phone: '',
			message: '',
		},

		validate: {
			name: (value) => (value?.trim().length === 0 ? 'Name is required' : false),

			email: (value) => (value?.trim().length === 0 ? 'Email is required' : false),
			phone: (value) => (value?.trim().length === 0 ? 'Phone is required' : false),

			message: (value) => (value?.trim().length === 0 ? 'Message is required' : false),
		},
	});

	return (
		<Card bg={'#FFFFFF'} p={'32PX'} radius={'1rem'}>
			<form
				onSubmit={form.onSubmit((values) => {
					const dataset: GIT_Types = {
						name: values.name.trim(),

						email: values.email.trim(),
						phone: values.phone.trim(),

						message: values.message.trim(),
					};
					// console.log('dataset', dataset);

					createForm({
						...dataset,
					})
						.then((resp) => {
							// console.log(resp);
						})
						.catch((err) => {
							// console.log(err);
						})
						.finally(() => {
							form.reset();
						});
				})}>
				<TextInput
					radius='3rem '
					size='md'
					variant='transparent'
					color='#828282'
					leftSection={<UserSquare />}
					placeholder={props?.data?.NameInputField}
					style={{ border: '1px solid #E0E0E0', borderRadius: '20px' }}
					styles={{
						input: {
							fontSize: '14px',
							fontWeight: 500,
							fontFamily: 'Noto Sans',
							lineHeight: '22.4px',
							letterSpacing: '-0.02625rem',
						},
					}}
					{...form.getInputProps('name')}
				/>

				<TextInput
					mt={'12px'}
					radius='3rem '
					size='md'
					variant='transparent'
					c={'#828282'}
					leftSection={<Mail_02 />}
					placeholder={props?.data?.EmailInputField}
					style={{ border: '1px solid #E0E0E0', borderRadius: '20px' }}
					styles={{
						input: {
							fontSize: '14px',
							fontWeight: 500,
							fontFamily: 'Noto Sans',
							lineHeight: '22.4px',
							letterSpacing: '-0.02625rem',
						},
					}}
					{...form.getInputProps('email')}
				/>
				<TextInput
					mt={'12px'}
					radius='3rem '
					size='md'
					variant='transparent'
					color='#828282'
					leftSection={<PhoneIconRed />}
					placeholder={props?.data?.PhoneInputField}
					style={{ border: '1px solid #E0E0E0', borderRadius: '20px' }}
					styles={{
						input: {
							fontSize: '14px',
							fontWeight: 500,
							fontFamily: 'Noto Sans',
							lineHeight: '22.4px',
							letterSpacing: '-0.02625rem',
						},
					}}
					{...form.getInputProps('phone')}
				/>
				<TextInput
					mt={'12px'}
					radius='3rem '
					size='md'
					variant='transparent'
					c={'#828282'}
					leftSection={<Masseage_Text_Circle />}
					placeholder={props?.data?.MessageInputField}
					style={{ border: '1px solid #E0E0E0', borderRadius: '20px' }}
					styles={{
						input: {
							fontSize: '14px',
							fontWeight: 500,
							fontFamily: 'Noto Sans',
							lineHeight: '22.4px',
							letterSpacing: '-0.02625rem',
						},
					}}
					{...form.getInputProps('message')}
				/>

				<Button
					mt='24px'
					type='submit'
					variant='filled'
					radius='3rem'
					size='md'
					color='#B82929'
					style={{
						border: '2px solid',
						fontSize: '14px',
						fontWeight: 500,
						fontFamily: 'Noto Sans',
						lineHeight: '22.4px',
						letterSpacing: '-0.02625rem',
					}}
					styles={{
						label: { paddingTop: '8px', paddingBottom: '8px', paddingLeft: '16px', paddingRight: '16px' },
						root: { padding: '0' },
					}}>
					send
				</Button>
			</form>
		</Card>
	);
}
