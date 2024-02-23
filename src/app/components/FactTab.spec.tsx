import { render } from '@testing-library/react';
import FactTab, { FactTabProps } from './FactTab';
import React from 'react';
import { addToFav } from '../variables';

describe('FactTab', () => {
  const factTabProps: FactTabProps = {
    handleAddFavourite: jest.fn(),
    catFact: {
      text: 'cat fact',
      id: '123'
    },
    buttonLabel: addToFav
  };
  const { getByText } = render(<FactTab {...factTabProps} />);

  it('should show cat fact text', () => {
    expect(getByText(factTabProps.catFact.text)).toBeDefined();
  });
});
