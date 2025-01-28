'use client';

interface TitleProps {
	title: string;
	color?: string;
	type?: 'sans' | 'serif';
}

const Title = ({ title, color, type = 'sans' }: TitleProps) => {
	const fontWeight = type === 'sans' ? 'font-bold' : 'font-semibold';
	const fontSize = 'lg:text-[48px] xl:text-[56px] 2xl:text-[64px] md:text-[32px]';
	const lineHeight = 'md:leading-[39.68px] lg:leading-[58.56px] xl:leading-[68.32px] 2xl:leading-[78.08px]';
	const letterSpacing = 'md:tracking-[-1.28px] lg:tracking-[-1.44px] xl:tracking-[-2.24px] 2xl:tracking-[-1.92px]';
	const fontFamily = type === 'sans' ? 'font-sans' : 'font-serif';
	const textColor = color ?? '';

	return <div className={`${fontWeight} ${lineHeight} ${letterSpacing} ${fontFamily} ${textColor} ${fontSize}`}>{title}</div>;
};

const Typography = {
	Title,
};

export default Typography;
