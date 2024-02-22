import { render, waitFor } from "@testing-library/react";
import TabsComponent from "./Tabs";
import * as React from 'react';

jest.mock('axios');

jest.mock('../services/useGetFact', () => {
    return jest.fn(() => ({
        loading: false,
        error: null,
        fetchFact: jest.fn(() => Promise.resolve({ text: 'cat fact', _id: '1' })),
    }));
});

describe('TabsComponent', () => {

    it('renders tabs correctly', () => {
        const { getByLabelText } = render(<TabsComponent />);
        const tabs = getByLabelText('tabs');
        expect(tabs).toBeDefined();
        expect(tabs.children.length).toBe(2);
    });

    it('should fetch and show cat fact', async () => {
        const { getByText } = render(<TabsComponent />)

        await waitFor(() => {
            expect(getByText('cat fact')).toBeDefined()
        })

    })
})