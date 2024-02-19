export interface Favourites {
    id: number,
    fact: string,
};

const favourites: Favourites[] = [];

export const getFavourites = (): Favourites[] | undefined => {
    return favourites;
}