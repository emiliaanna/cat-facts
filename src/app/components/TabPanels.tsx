import * as React from 'react';
import { useState, useEffect } from 'react';
import { ICatFact } from './Tabs';
import TabPanel from './TabPanel';
import FactTab from './FactTab';
import FavouritesTab from './FavouritesTab';
import { addToFav } from '../variables';
import { CatFactType } from '../services/useFact';

interface TabPanelsProps {
  tabValue: number;
  fetchFact: () => Promise<CatFactType>;
}

const processFavourites = (favouritesData: ICatFact[]) => {
  // imagine heavy computations here
  return favouritesData.map((fav) => ({
    id: fav.id,
    text: fav.text.toUpperCase()
  }));
};

export default function TabPanels(props: TabPanelsProps) {
  const { tabValue, fetchFact } = props;

  const [favourites, setFavourites] = useState<ICatFact[]>([]);
  const [cat, setCat] = useState<ICatFact>();

  const processFavs = React.useMemo(
    () => processFavourites(favourites),
    [favourites]
  );

  const handleAddFavourite = (catFact: ICatFact) => {
    setFavourites((currentFav) => [...currentFav, catFact]);
  };

  const handleRemoveFavourite = (id: string) => {
    setFavourites((currentFav) => currentFav.filter((fav) => fav.id != id));
  };

  useEffect(() => {
    fetchFact()
      .then((response) => {
        setCat({ text: response.text, id: response._id });
      })
      .catch((err) => {
        throw err;
      });
  }, [favourites]);

  return (
    <>
      <TabPanel value={tabValue} index={0}>
        {cat && (
          <FactTab
            handleAddFavourite={handleAddFavourite}
            catFact={cat}
            buttonLabel={addToFav}
            aria-label="fact-tab"
          />
        )}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <FavouritesTab
          favourites={processFavs}
          handleRemoveFavourite={handleRemoveFavourite}
          aria-label="favourites-tab"
        />
      </TabPanel>
    </>
  );
}
