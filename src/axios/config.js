import axios from "axios";

const movieFetcher = axios.create({
    baseURL: "https://tools.texoit.com/backend-java/api/movies",
    headers: {
        "Content-type": "application/json"
    }
});

export default movieFetcher;