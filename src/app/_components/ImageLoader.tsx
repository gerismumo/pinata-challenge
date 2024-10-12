
import React, { useState } from 'react';
import Image from 'next/image'; 
import Spinner from './Spinner';


interface Props {
  src: string;
  alt?: string;
  fill?: boolean;
}

const ImageLoader: React.FC<Props> = ({ src, alt = '', fill = false }) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center text-[20px] justify-center text-lightRed bg-white z-10">
          <Spinner/>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        onLoadingComplete={handleLoad}
        className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};

export default ImageLoader;
