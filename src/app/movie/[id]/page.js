import React from 'react';
import styles from "@/app/styles/common.module.css";
import Image from "next/image";

const Page = async ({ params }) => {
    const { id } = params;

    // Define the API URL
    const url = `https://netflix54.p.rapidapi.com/title/details/?ids=${id}&lang=en`;

    // API request options
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ec389782bfmshc0a784a9a8c1d57p121840jsna66bd670f5d9',
            'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
        }
    };

    try {
        // Fetch the movie details
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        const main_data = data[0].details;

        // Display movie details
        return (
            <div className={styles.container}>
                <h2 className={styles.movie_title}>Netflix \ <span>{main_data.type}</span></h2>
                <div className={styles.card_section}>
                    <div>
                        <Image 
                            src={main_data.backgroundImage.url} 
                            alt={main_data.title} 
                            width={600} 
                            height={300} 
                        />
                    </div>
                    <div>
                        <h1>{main_data.title}</h1>
                        <p>{main_data.synopsis}</p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        return (
            <div className={styles.container}>
                <p>Error loading movie details: {error.message}</p>
            </div>
        );
    }
};

export default Page;
