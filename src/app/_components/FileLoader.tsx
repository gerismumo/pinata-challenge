// FileLoader.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Spinner from './Spinner';

interface Props {
  src: string;
  alt?: string;
  fill?: boolean;
}

const FileLoader: React.FC<Props> = ({ src, alt = '' }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fileType, setFileType] = useState<string | null>(null);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  // Function to fetch the content type of the file
  const fetchFileType = async (url: string) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const contentType = response.headers.get('Content-Type');
      console.log("contentType", contentType);
      if (contentType) {
        if (contentType.startsWith('image/')) {
          setFileType('image');
        } else if (contentType.startsWith('audio/')) {
          setFileType('audio');
        } else if (contentType.startsWith('video/')) {
          setFileType('video');
        } else if (contentType.startsWith('application/pdf') || contentType.startsWith('application/msword') || contentType.startsWith('application/vnd.openxmlformats-officedocument')) {
          setFileType('document');
        } else {
          setFileType('unknown');
        }
      } else {
        setFileType('unknown');
      }
    } catch (error) {
      console.error('Error fetching the URL:', error);
      setFileType('unknown');
    }
  };

  useEffect(() => {
    fetchFileType(src);
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {loading && !error && (
        <div className="absolute inset-0 flex items-center text-[20px] justify-center text-lightRed bg-white z-10">
          <Spinner />
        </div>
      )}

      {fileType === 'image' && (
        <Image
          src={src}
          alt={alt}
          fill
          onLoadingComplete={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        />
      )}

      {fileType === 'audio' && (
        <audio controls className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <source src={src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      {fileType === 'video' && (
        <video controls className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`} width="100%">
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {fileType === 'document' && (
        <div className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <a href={src} target="_blank" rel="noopener noreferrer" className="text-blue-600">
            Download Document
          </a>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          <span>Error loading file</span>
        </div>
      )}
    </div>
  );
};

export default FileLoader;
