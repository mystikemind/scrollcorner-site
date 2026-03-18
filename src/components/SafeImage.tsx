'use client';
import { useState } from 'react';
import Image from 'next/image';

const FALLBACK = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80';

interface Props {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
}

export default function SafeImage({ src, alt, fill, className }: Props) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      className={className}
      onError={() => setImgSrc(FALLBACK)}
      unoptimized
    />
  );
}
