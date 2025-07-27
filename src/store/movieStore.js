import { makeAutoObservable } from "mobx";
import moviesJson from "../data/movies.json"; // save your provided JSON as movies.json

class MovieStore {
    movies = moviesJson.movies;

    constructor() {
        makeAutoObservable(this);
    }
}

export const movieStore = new MovieStore();
