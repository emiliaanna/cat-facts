import * as React from 'react';
import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel';
import FactTab from './FactTab';
import FavouritesTab from './FavouritesTab';
import { addToFav, errorMessage, factsTabTitle, favouritesTabTitle } from '../variables';
import { Grid, Typography } from '@mui/material';
import useGetFact from '../services/useGetFact';

function tabProps(index: number) {
    return {
        id: `cat-tab-${index}`,
        'aria-controls': `cat-tabpanel-${index}`,
    };
}

export interface ICatFact {
    id: string,
    text: string,
}

const processFavourites = (favouritesData: ICatFact[]) => {
    // imagine heavy computations here
    return favouritesData.map(fav => ({ id: fav.id, text: fav.text.toUpperCase() }));
  };


export default function TabsComponent() {
    const [value, setValue] = useState(0);
    const [favourites, setFavourites] = useState<ICatFact[]>([]);
    const [cat, setCat] = useState<ICatFact>();


    const { loading, error, fetchFact } = useGetFact();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleAddFavourite = (catFact: ICatFact) => {
        setFavourites(currentFav => [...currentFav, catFact]);
    }

    const handleRemoveFavourite = (id: string) => {
        setFavourites(currentFav => currentFav.filter(fav => fav.id != id));
    }

    const processFavs = React.useMemo(() => processFavourites(favourites), [favourites]);

    useEffect(() => {
        fetchFact()
        .then((response) => {
            setCat({ text: response.text, id: response._id })
        })
        .catch(err => {
            throw err;
        })
        
    }, [favourites]);
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Grid>
            {loading && (
                <Typography>
                    Loading...
                </Typography>
            )}
            {!error ? (
                <>
                    <Tabs value={value} onChange={handleChange} aria-label='tabs'>
                        <Tab label={factsTabTitle} {...tabProps(0)} />
                        <Tab label={favouritesTabTitle}  {...tabProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        {cat && (
                            <FactTab
                                handleAddFavourite={handleAddFavourite}
                                catFact={cat}
                                buttonLabel={addToFav}
                                aria-label='fact-tab'
                            />
                        )}

                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <FavouritesTab
                            favourites={processFavs}
                            handleRemoveFavourite={handleRemoveFavourite}
                            aria-label='favourites-tab'
                        />
                    </TabPanel>
                </>
            ) : (
                <Typography>
                    {errorMessage}
                </Typography>
            )}

        </Grid>
    )
}