'use client';

import arrowRight from '@/assets/arrow-right-black.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  title?: string;
  textHref?: string;
  href?: string;
  className?: string;
}

const TitleHead: React.FC<Props> = ({ title, href, textHref, className }) => {
  const router = useRouter();
  return (
    <div className={`text-dark flex items-center justify-between mb-2 ${className}`}>
      <span className="font-semibold text-lg">{title}</span>
      <span onClick={() => router.push(href || '/')} className="cursor-pointer">
        <span className=" ">{textHref}</span>
        <Image src={arrowRight} alt="Arrow Right" className="inline-block ml-1" />
      </span>
    </div>
  );
};

export { TitleHead };
