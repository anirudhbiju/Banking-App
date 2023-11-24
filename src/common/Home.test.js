import { fireEvent, getByLabelText, getByRole, getByText, queryByText, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { customerService } from '../apiUrls';
import { Home } from './Home';

test("renders correctly", () => {
  render(
    <MemoryRouter>
        <Home/>
    </MemoryRouter>
  );
});
