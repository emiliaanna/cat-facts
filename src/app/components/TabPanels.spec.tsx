import { render, waitFor } from '@testing-library/react';
import TabPanels from './TabPanels';
import * as React from 'react';

describe('TabPanels', () => {
  const props = {
    tabValue: 0,
    fetchFact: jest.fn(() => Promise.resolve({ text: 'cat fact', _id: '1' }))
  };

  it('should fetch and show cat fact', async () => {
    const { getByText } = render(<TabPanels {...props} />);

    await waitFor(() => {
      expect(getByText('cat fact')).toBeDefined();
    });
  });
});
