import { get, map } from '@/utils';

import { BASE_URL, IMAGE_URL } from '@/config';
import Image from 'next/image';
import Link from 'next/link';
import { RightArrowIcon } from '@/common/@the-source/Icon';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import axios from 'axios';
import classes from './Card.module.css';
import { getArticlesUrl } from '@/utils/articlesUrl';

export default function Card({ article }: any) {
    const href = `/article/${encodeURI(get(article, 'attributes.slug', ''))}`;
    const title = get(article, 'attributes.Title', '');
    const url = get(article, 'attributes.Cover_image.data.attributes.url', '');
    const localizations = get(article, 'attributes.localizations.data', []);
    const Authors = get(article, 'attributes.Authors', []);
    const authorNames = Authors.map((author: any) => {
        return get(author, 'author_name.data.attributes.Name', '');
    });
    const authorsString = authorNames.join(', ');

    const district = article?.attributes?.location?.data?.attributes?.district;
    const state = article?.attributes?.location?.data?.attributes?.state;
    const MAX_NAME_LENGTH = 15; // Define a maximum length for the name
    let displayText;

    const locationInfo = get(article, 'attributes.location.description', '');
    const locationInfostate = get(article, 'attributes.location.details.address_components[0]', '');
    const locationInfocity = get(article, 'attributes.location.details.address_components[0]', '');
    const isStudent = get(article, 'attributes.is_student', false);

    const createdAt = get(article, 'attributes.Original_published_date') || get(article, 'attributes.publishedAt');
    const authorsInfo = Authors.find((i: any) => i?.author_role?.data?.attributes?.Name === 'Author');
    const authorName = get(authorsInfo, 'author.data.attributes.Name');

    const weekdays = useTranslations('date');
    const date = dayjs(createdAt).format('MMM D, YYYY');
    const parts = date.split(' ');
    const week = get(parts, '0', '');
    const month = get(parts, '1', '');
    const localDate = dayjs(createdAt).format('MMM DD, YYYY');
    const addressComponents = get(article, 'attributes.location.details.address_components', []);
    const locality =
        addressComponents.find((component: { types: string | string[] }) => component.types.includes('locality'))?.long_name || '';
    const adminArea =
        addressComponents.find((component: { types: string | string[] }) => component.types.includes('administrative_area_level_1'))
            ?.long_name || '';

    const [categories, setCategories] = useState([]);
    const baseStyles = {
        border: '1px solid transparent', // Default border
        padding: '0.44rem 0.75rem',
        marginRight: '8px',
        marginBottom: '0.5rem',
        borderRadius: '32px',
        fontSize: '12px',
        fontWeight: '500',
        minWidth: 'max-content',
        textDecoration: 'none', // Ensure no underline for links
        transition: 'background-color 0.3s ease', // Smooth transition for hover effect
    };

    const studentStyles = {
        color: '#2f80ed',
        borderColor: '#2f80ed',
        '&:hover': {
            backgroundColor: '#2f80ed',
            color: 'white',
        },
    };

    const nonStudentStyles = {
        color: '#b82929',
        borderColor: '#b82929',
        '&:hover': {
            backgroundColor: '#b82929',
            color: 'white',
        },
    };
    const finalStyles = isStudent ? { ...baseStyles, ...studentStyles } : { ...baseStyles, ...nonStudentStyles };

    useEffect(() => {
        const url2 = `${BASE_URL}api/articles?locale=all&filters[slug][$eq]=${article?.attributes?.slug?.replaceAll(
            '&',
            '%26',
        )}&populate[categories]=deep`;

        axios({
            url: url2,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((catRes) => {
            const categories = catRes.data.data[0].attributes.categories.data;

            setCategories(categories);
        });
    }, [article.id]);

    return (
        <div className={classes.div}>
            <div className={classes.container}>
                <div
                    style={{
                        height: '200px',
                        width: '212px',
                        background: `url(${IMAGE_URL}${url})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        borderRadius: '0.5rem',
                    }}></div>
            </div>
            <div
                style={{
                    width: '380px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        paddingBottom: '24px',
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            gap: '16px',
                            flexWrap: 'wrap',
                            marginTop: '4px',
                            marginBottom: '4px',
                            height: '34.7969px',
                        }}>
                        {map(categories, (category: any, index: any) => (
                            <div
                                key={index}
                                style={{
                                    paddingBottom: '10px',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                }}>
                                {index === 0 ? (
                                    <div>
                                        <Link
                                            href={getArticlesUrl({
                                                categoryIds: [category?.id],
                                            })}
                                            style={finalStyles}>
                                            {category?.attributes?.Title}
                                        </Link>

                                        {Math.max(index, categories.length - 1) !== 0 && (
                                            <Link href='/' style={finalStyles}>
                                                {'+' + Math.max(index, categories.length - 1)}
                                            </Link>
                                        )}
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        ))}
                    </div>
                    <h1 className={classes.title}> {title}</h1>
                    <p className={classes.author}>{authorsString}</p>
                    <p className={classes.locale}>{localizations?.length > 0 && `${localizations.length + 1} Languages`}</p>
                </div>
                <div
                    style={{
                        fontWeight: 600, // font-semibold
                        fontSize: '13px', // text-[13px]
                        color: isStudent ? '#2f80ed' : '#b82929', // text-primary-pari-blue or text-primary-pari-red
                        borderTop: '1px solid', // border-t
                        borderColor: '#e0e0e0', // border-gray-5 (replace with actual color)
                        paddingTop: '24px', // pt-[24px]
                        textTransform: 'uppercase', // uppercase
                        display: 'flex', // flex
                        gap: '8px', // gap-[8px]
                        alignItems: 'center', // items-center
                        flexWrap: 'nowrap', // Ensure content is in a single line
                        overflow: 'hidden', // line-clamp effect, though may need additional CSS
                        whiteSpace: 'nowrap', // Prevent line breaks
                    }}>
                    {district && <span>{district}</span>}
                    {district && state && <span> • </span>}
                    {state && <span>{state}</span>}
                    {state && <span> • </span>}
                    <span>{date}</span>
                    <RightArrowIcon isStudent={isStudent} />{' '}
                </div>
            </div>
        </div>
    );
}