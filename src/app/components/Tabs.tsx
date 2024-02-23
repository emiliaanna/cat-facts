import * as React from 'react';
import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { errorMessage, factsTabTitle, favouritesTabTitle } from '../variables';
import { Container, Grid, Typography } from '@mui/material';
import useFact from '../services/useFact';
import TabPanels from './TabPanels';

function tabProps(index: number) {
  return {
    id: `cat-tab-${index}`,
    'aria-controls': `cat-tabpanel-${index}`
  };
}

export interface ICatFact {
  id: string;
  text: string;
}

export default function TabsComponent() {
  const [value, setValue] = useState(0);

  const { loading, error, fetchFact } = useFact();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container>
      <Grid>
        {loading && <Typography>Loading...</Typography>}
        {!error && (
          <>
            <Tabs value={value} onChange={handleChange} aria-label="tabs">
              <Tab label={factsTabTitle} {...tabProps(0)} />
              <Tab label={favouritesTabTitle} {...tabProps(1)} />
            </Tabs>
            <TabPanels fetchFact={fetchFact} tabValue={value} />
          </>
        )}
      </Grid>
    </Container>
  );
}
