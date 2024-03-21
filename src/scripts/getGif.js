import { GiphyFetch } from "@giphy/js-fetch-api";
//import { gifFetch } from "../index";

const gifFetch = new GiphyFetch('Zvz1NV3juRJaUJte9W2Hw37CvkKNrNHE');
console.log(gifFetch);
const { data } =  await gifFetch.random();
console.log(data.images.original.url);


const getGif = () => {
    return (
        data.images.original.url
    );
};

export default getGif;
