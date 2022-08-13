import Image from "next/image"

import styles from "./index.module.scss"

interface ICustomImageProps {
    className?: string
    src: string
    alt?: string
}

export default function CustomImage({ className = "", src, alt = "image" }: ICustomImageProps) {
    return (
        <div className={`${className} ${styles.customImage}`}>
            <Image
                alt={alt}
                className={`${styles.image} max-h-full	max-w-full`}
                layout="fill"
                loader={() => src}
                src={src}
            />
        </div>
    )
}
