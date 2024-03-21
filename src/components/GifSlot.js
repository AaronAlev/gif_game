import React, { useState } from 'react';
import { giphy_api_key } from '../index';

const GifSlot = () => {
    const [gifUrl, setGifUrl] = useState('');

    const endpoint = 'https://api.giphy.com/v1/gifs/random';

    const getGif = async (event) => {
        event.preventDefault();

        const url = `${endpoint}?api_key=${giphy_api_key}&tag=&rating=g`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setGifUrl(data.data.images.original.url);
        } catch (error) {
            console.error('Error fetching random GIF:', error);
            return [];
        }


        //try {
            //const { data } = await gifFetch.random({ cache: 'no-cache' });
            //setGifUrl(data.images.original.url);
            //console.log(data.images.original.url)
        //} catch (error) {
        //    console.error('Error fetching random GIF:', error);
        //}
    }

    return (
        <div className="gif-slot">
            <form onSubmit={getGif} id="new-gif">
                <button type="submit">New Gif</button>
            </form>
            <img src={gifUrl} alt="gif"/>
        </div>
    );
};

export default GifSlot;