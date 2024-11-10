import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for better assertions
import SeasonList from '.';

test('renders RaceList component', () => {
    render(<SeasonList />);
    const element = screen.getByText(/SeasonList/i); // Adjust the text to match something rendered by RaceList
    expect(element).toBeInTheDocument();
});
