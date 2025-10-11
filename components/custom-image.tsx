import Image from "next/image";
import clsx from "clsx";

interface ImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  height?: number;
  width?: number;
  class?: string;
  className?: string;
}

export default function CustomImage({ image }: { image: ImageProps }) {
  return (
    <div className={clsx("relative box-border ", image.class)}>
      <Image
        style={{ aspectRatio: image.aspectRatio}}
        src={image.src}
        alt={image.alt}
        height={image.height || 1080}
        width={image.width || 1920}
        className={clsx("", image.className)}
      />
    </div>
  );
}
