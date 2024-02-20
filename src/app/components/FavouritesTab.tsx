import * as React from 'react';
import FactCard from './FactCard';
import { ICatFact } from './TabsComponent';
import { removeFromFav } from '../variables';
import { Grid } from '@mui/material';


interface FavouritesTabProps {
    favourites: Array<ICatFact>;
    handleRemoveFavourite: (catFact: ICatFact) => void;
}

export default function FavouritesTab(props: FavouritesTabProps) {
    const { favourites, handleRemoveFavourite } = props;

    const favouritesMemo = React.useMemo(() =>
        favourites.map((favFact, index) =>
            (<FactCard
                text={favFact.text}
                key={index}
                onButtonPress={() => handleRemoveFavourite(favFact)}
                buttonLabel={removeFromFav}
            />)
            ), [favourites]
    );

    return <Grid>
        {favouritesMemo}
    </Grid>
}
