interface Props {}
import loadingSVG from '@/assets/loading.svg';
import Image from 'next/image';

const Loading: React.FC<Props> = ({}) => {
  return <Image src={loadingSVG} alt="Loading..." className="animate-spin-reverse" />;
};

export { Loading };
