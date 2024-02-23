import * as React from 'react';
import FactCard from './FactCard';
import { ICatFact } from './Tabs';
import { Grid } from '@mui/material';

export interface FactTabProps {
  handleAddFavourite: (catFact: ICatFact) => void;
  catFact: ICatFact;
  buttonLabel: string;
}

export default function FactTab(props: FactTabProps) {
  const { handleAddFavourite, catFact, buttonLabel } = props;

  return (
    <Grid>
      <FactCard
        text={catFact.text}
        onButtonPress={() => handleAddFavourite(catFact)}
        buttonLabel={buttonLabel}
      />
    </Grid>
  );
}
