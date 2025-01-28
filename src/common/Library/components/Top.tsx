import Image from "next/image";
import Link from "next/link";

import { get, map } from "@/utils";
import { IMAGE_URL } from "@/config";

export default function Top({ banner }: any) {
    return (
        <div className='overflow-x-auto no-scrollbar pb-10'>
            <div className='flex flex-row gap-8 3xl:px-[104px] 2xl:px-[104px] xl:px-[104px] lg:px-[104px] md:px-[32px] sm:px-[32px]'>
                {map(banner, (library: any) => {
                    const slug = get(library, 'attributes.slug', null);
                    const thumbnail = get(library, 'attributes.Thumbnail.data.attributes.url');
                    const href = `/library/${slug}`;

                    return (
                        <Link href={href} key={slug}>
                            <Image
                                src={`${IMAGE_URL}${thumbnail}`}
                                alt={slug}
                                width={256}
                                height={336}
                                className='
                                    rounded-[16px]
                                    shadow-[0px_1px_4px_rgba(0,_0,_0,_0.28)]
                                    w-[750px] lg:w-[572px] md:w-[572px] sm:w-[311px]
                                    h-[402px] lg:h-[402px] md:h-[402px] sm:h-[402px]
                                    object-cover
                                    mb-[20px]
                                '
                            />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
