import * as React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TabsComponent from './app/components/TabsComponent';
import { Container } from '@mui/material';

const root = createRoot(document.body);
root.render(
    <Container>
        <TabsComponent/>
    </Container>
);