import { fireEvent, getByLabelText, getByRole, getByText, queryByText, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { customerService } from '../apiUrls';
import App from './App';

test("renders correctly", () => {
  render(
    <MemoryRouter>
        <App/>
    </MemoryRouter>
  );
});
