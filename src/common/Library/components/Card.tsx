import Image from "next/image";

import { IMAGE_URL } from "@/config";
import { RightArrowIcon } from "@/common/@the-source/Icon";
import { get } from "@/utils";

export default function Card({ library }: any) {
    const thumbnail = get(library, 'attributes.Thumbnail.data.attributes.url');
    const title = get(library, 'attributes.Title');

    return (
        <div>
            <div 
                className='
                    font-sans 
                    w-[256px] lg:w-[256px] md:w-[256px] sm:w-[311px] 
                    gap-[24px] flex flex-col
                    sm:flex-row xs:flex-row 
                    sm:gap-[16px] xs:gap-[16px]
                '>
                <Image
                    src={`${IMAGE_URL}${thumbnail}`}
                    alt={title}
                    width={256}
                    height={336}
                    className='
                        rounded-[16px]
                        shadow-[0px_1px_4px_rgba(0,_0,_0,_0.28)]
                        w-[100%] sm:w-[112px] xs:w-[112px]
                        h-[402px] sm:h-[136px] xs:h-[136px]
                        object-cover
                    '
                />
            </div>

            <div className="gap-[16px]">
                <h3 className='text-black font-sans font-semibold text-[18px] text-[#202020] dark:text-white'>
                    {title}
                </h3>
                <p className='text-black font-sans font-semibold text-[12px] text-[#828282] line-clamp-1'>
                    {title}
                </p>
                <div
                    className='
                        font-semibold
                        text-[13px]
                        text-primary-pari-red dark:text-white
                        flex gap-[8px] items-center
                        uppercase
                    '>
                    Read Report
                    <RightArrowIcon className='stroke-[#B82929] dark:stroke-[#fff]' />
                </div>
            </div>
        </div>
    )
}
