import styles from '@/app/styles/common.module.css';
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ episodeId, title, contextualSynopsis, interestingMoment }) => {
    return (
        <div className={styles.card}>
            <div className={styles.card_image}>
                {interestingMoment?._342x192?.webp?.value?.url ? (
                    <Image
                        src={interestingMoment._342x192.webp.value.url}
                        alt={title}
                        width={342}
                        height={192}
                        placeholder="blur"
                        blurDataURL="/placeholder-image.jpg" // Ensure this path is correct
                    />
                ) : (
                    <div className={styles.image_placeholder}>Image not available</div>
                )}
            </div>
            <div className={styles.card_data}>
                <h2>{title}</h2>
                <p>{contextualSynopsis?.text}</p>
                <Link href={`/movie/${episodeId}`}>
                    <button>
                        Read More
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default MovieCard;