import React from 'react';
import MovieCard from "@/app/components/MovieCard";
import styles from "@/app/styles/common.module.css";

const Movie = async () => {

    await new Promise(resolve => setTimeout(resolve, 2000));

    const url = process.env.RAPID_KEY;
    

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ec389782bfmshc0a784a9a8c1d57p121840jsna66bd670f5d9',
            'x-rapidapi-host': 'netflix54.p.rapidapi.com'
        }
    };

    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("API response data:", data); // Log the data to check its structure

        // Flatten the episodes arrays from each season into a single array
        const main_data = data.flatMap(season => season.episodes);

        if (!main_data || !Array.isArray(main_data)) {
            console.error("main_data is undefined or not an array");
            return (
                <>
                    <p>Error loading data</p>
                </>
            );
        }

        return (
            <>
                <section className={styles.movieSection}>
                    <div className={styles.container}>
                        <div className={styles.card_section}>
                            {
                                main_data.map((curElem) => {
                                    return <MovieCard key={curElem.episodeId} {...curElem} />
                                })
                            }
                        </div>
                    </div>
                </section>
            </>
        );
    } catch (error) {
        console.error("Fetch error:", error);
        return (
            <>
                <p>Error loading data: {error.message}</p>
            </>
        );
    }
};

export default Movie;