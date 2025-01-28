import { BsPersonSquare, BsTelephone } from 'react-icons/bs';
import { Button, Card, Checkbox, Divider, Group, List, Modal, Space, Stack, Text, TextInput, Textarea, rem } from '@mantine/core';

import { GoPerson } from 'react-icons/go';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { JoinUsType } from '../../../../types/joinUsOrgs';
import { MdOutlineSchool } from 'react-icons/md';
import { PiPenNibLight } from 'react-icons/pi';
import { TfiEmail } from 'react-icons/tfi';
import { createModal } from '../../../../lib/joinUs';
import { useForm } from '@mantine/form';
import { useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import EducationIcon from '@/common/Icons/EducationIcon';
import EducationIcon2 from '@/common/Icons/EducationIcon2';
import UserIcon from '@/common/Icons/UserIcon';
import DesignationIcon from '@/common/Icons/DesignationIcon';
import PhoneIcon from '@/common/Icons/PhoneIcon';
import EmailIcom from '@/common/Icons/EmailIcon';
import InstituteIcon from '@/common/Icons/InstitustionIcon';
import MessageIcon from '@/common/Icons/MessageIcon';

export default function ModelSection({ opened, close }: { opened: boolean; open: () => void; close: () => void }) {
	const theme = useMantineTheme();
	const { width } = useViewportSize();

	const form = useForm<JoinUsType>({
		initialValues: {
			individual: false,
			instituteType: false,
			nonGovernment: false,
			name: '',
			designation: '',
			phone: '',
			email: '',
			institutionName: '',
			message: '',
		},

		validate: {
			name: (value) => (value?.trim().length === 0 ? 'Name is required' : false),
			designation: (value) => (value?.trim().length === 0 ? 'Designation is required' : false),
			phone: (value) => (value?.trim().length === 0 ? 'Phone is required' : false),
			email: (value) => (value?.trim().length === 0 ? 'Email is required' : false),
			institutionName: (value) => (value?.trim().length === 0 ? 'Institution Name is required' : false),
			message: (value) => (value?.trim().length === 0 ? 'Message is required' : false),
		},
	});

	return (
		<Modal
			opened={opened}
			onClose={close}
			size='lg'
			title='PARI Education'
			bg={'#F4F4F4'}
			styles={{
				body: { padding: 0, borderRadius: 0 },
				title: {
					fontSize: '15px',
					fontWeight: 500,
					fontFamily: 'Noto Sans',
					color: '#181818',
					lineHeight: '25.5px',
					letterSpacing: '-0.6px',
				},
				header: { paddingRight: '32px', paddingLeft: '32px', paddingTop: '12px', paddingBottom: '12px' },
			}}>
			<Card bg={'#F4F4F4'} pt={width >= 1024 ? '32px' : '24px'} pb={width >= 1024 ? '45px' : '40px'} px={'32px'}>
				<form
					onSubmit={form.onSubmit((values) => {
						const dataset: JoinUsType = {
							individual: values.individual,
							instituteType: values.instituteType,
							nonGovernment: values.nonGovernment,
							name: values.name.trim(),
							designation: values.designation.trim(),
							phone: values.phone.trim(),
							email: values.email.trim(),
							institutionName: values.institutionName.trim(),
							message: values.message.trim(),
						};
						// console.log('dataset', dataset);

						createModal({
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
					<Text
						style={{
							fontSize: '18px',
							fontFamily: 'Noto Sans',
							fontStyle: 'normal',
							color: '#4F4F4F',
							fontWeight: 600,
							letterSpacing: '-0.72px',
							lineHeight: '25.2px',
						}}>
						Reach out to us at PARI Education
					</Text>

					<Text
						pt={width >= 1024 ? '12px' : '16px'}
						c={'#000'}
						size={width < 1024 ? '15px' : '16px'}
						style={{
							fontFamily: 'Noto Sans',
							fontStyle: 'normal',
							fontWeight: 400,
							lineHeight: width >= 1024 ? '25.5px' : '19.2px',
							letterSpacing: width >= 1024 ? '-0.45px' : '-0.36px',
						}}>
						If you’re an individual educator, a teacher at a school or university or any other parallel educational
						institution, and would like to partner with us, please fill out the form below.
					</Text>

					<Group pt={width >= 1024 ? '32px' : '30px'} gap={'8px'} pb={'16px'}>
						<EducationIcon2 />
						<Text
							style={{
								color: '#828282',
								fontFamily: 'Noto Sans',
								fontSize: '13px',
								fontStyle: 'normal',
								fontWeight: 600,
								lineHeight: 'normal',
								letterSpacing: '-0.26px',
							}}>
							TYPE OF EDUCATOR
						</Text>
					</Group>

					<Card radius={'0.75rem'} p={0}>
						<Checkbox
							py={'12px'}
							pl={'12px'}
							pr={'8px'}
							size='24px'
							styles={{
								label: {
									fontSize: '15px',
									fontWeight: 400,
									color: '#000',
									padding: '0px',
									lineHeight: '25.5px',
									letterSpacing: '-0.45px',
									fontFamily: 'Noto Sans',
								},
								body: { gap: '8px' },
							}}
							label='Individual'
							{...form.getInputProps('individual', { type: 'checkbox' })}
						/>

						<Divider />

						<Checkbox
							py={'12px'}
							pl={'12px'}
							pr={'8px'}
							size='24px'
							styles={{
								label: {
									fontSize: '15px',
									fontWeight: 400,
									color: '#000',
									padding: '0px',
									lineHeight: '25.5px',
									letterSpacing: '-0.45px',
									fontFamily: 'Noto Sans',
								},
								body: { gap: '8px' },
							}}
							label='School/College/University'
							{...form.getInputProps('instituteType', { type: 'checkbox' })}
						/>
						<Divider />
						<Checkbox
							py={'12px'}
							pl={'12px'}
							pr={'8px'}
							size='24px'
							styles={{
								label: {
									fontSize: '15px',
									fontWeight: 400,
									color: '#000',
									gap: '8px',
									padding: '0px',
									lineHeight: '25.5px',
									letterSpacing: '-0.45px',
									fontFamily: 'Noto Sans',
								},
								body: { gap: '8px' },
							}}
							label='Non Governmental Institution'
							{...form.getInputProps('nonGovernment', { type: 'checkbox' })}
						/>
					</Card>

					<TextInput
						mt={'24px'}
						radius='3rem '
						size='md'
						variant='transparent'
						color='#828282'
						leftSection={<UserIcon />}
						placeholder='Name'
						style={{ border: '1px solid #E0E0E0', borderRadius: '20px' }}
						styles={{
							input: {
								fontSize: '12px',
								fontWeight: 500,
								fontFamily: 'Noto Sans',
								lineHeight: '19.2px',
								letterSpacing: '-0.36px',
							},
						}}
						{...form.getInputProps('name')}
					/>

					<TextInput
						mt={'16px'}
						radius='3rem '
						size='md'
						c={'#828282'}
						styles={{
							input: {
								fontSize: '12px',
								fontWeight: 500,
								fontFamily: 'Noto Sans',
								lineHeight: '19.2px',
								letterSpacing: '-0.36px',
							},
						}}
						variant='transparent'
						leftSection={<DesignationIcon />}
						placeholder='Designation'
						style={{ border: '1px solid #E0E0E0', borderRadius: '20px' }}
						{...form.getInputProps('designation')}
					/>

					<TextInput
						mt={'16px'}
						radius='3rem '
						size='md'
						variant='transparent'
						c={'#828282'}
						leftSection={<PhoneIcon />}
						placeholder='Phone'
						style={{ border: '1px solid #E0E0E0', borderRadius: '20px' }}
						styles={{
							input: {
								fontSize: '12px',
								fontWeight: 500,
								fontFamily: 'Noto Sans',
								lineHeight: '19.2px',
								letterSpacing: '-0.36px',
							},
						}}
						{...form.getInputProps('phone')}
					/>

					<TextInput
						mt={'16px'}
						radius='3rem '
						size='md'
						variant='transparent'
						c={'#828282'}
						leftSection={<EmailIcom />}
						placeholder='Email'
						style={{ border: '1px solid #E0E0E0', borderRadius: '20px' }}
						styles={{
							input: {
								fontSize: '12px',
								fontWeight: 500,
								fontFamily: 'Noto Sans',
								lineHeight: '19.2px',
								letterSpacing: '-0.36px',
							},
						}}
						{...form.getInputProps('email')}
					/>

					<TextInput
						mt={'16px'}
						radius='3rem '
						size='md'
						variant='transparent'
						c={'#828282'}
						leftSection={<InstituteIcon />}
						placeholder='Institution Name'
						style={{ border: '1px solid #E0E0E0', borderRadius: '20px' }}
						styles={{
							input: {
								fontSize: '12px',
								fontWeight: 500,
								fontFamily: 'Noto Sans',
								lineHeight: '19.2px',
								letterSpacing: '-0.36px',
							},
						}}
						{...form.getInputProps('institutionName')}
					/>

					<Textarea
						mt={'16px'}
						radius='1rem '
						size='md'
						variant='transparent'
						c={'#828282'}
						styles={{
							section: { alignItems: 'flex-start', marginTop: theme.spacing.sm },
							input: {
								fontSize: '12px',
								fontWeight: 500,
								fontFamily: 'Noto Sans',
								lineHeight: '19.2px',
								letterSpacing: '-0.36px',
							},
						}}
						style={{ border: '1px solid #E0E0E0', borderRadius: '30px' }}
						minRows={5}
						placeholder='Message'
						leftSection={<MessageIcon />}
						autosize
						{...form.getInputProps('message')}
					/>

					<Button
						mt={width >= 1024 ? '32px' : '30px'}
						type='submit'
						variant="outlined"
						radius='3rem'
						size='md'
						color='#2F80ED'
						w={'100%'}
						style={{
							borderRadius: '3rem',
								padding: '0',
								borderColor: '#2F80ED',
								color: '#2F80ED',
								fontSize: '16px',
								fontFamily: 'Noto Sans',
								backgroundColor: 'transparent',  // Ensures no background color
								transition: 'none',  // Disables transition effects
						}}
						styles={{
							label: { paddingTop: '14px', paddingBottom: '14px', paddingLeft: '28px', paddingRight: '28px' },
							root: { padding: '0' },
						}}>
						Confirm Form Submission
					</Button>
				</form>
			</Card>
		</Modal>
	);
}
