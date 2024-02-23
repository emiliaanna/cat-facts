import { render } from '@testing-library/react';
import TabsComponent from './Tabs';
import * as React from 'react';

describe('TabsComponent', () => {
  it('renders tabs correctly', () => {
    const { getByLabelText } = render(<TabsComponent />);
    const tabs = getByLabelText('tabs');
    expect(tabs).toBeDefined();
    expect(tabs.children.length).toBe(2);
  });
});
