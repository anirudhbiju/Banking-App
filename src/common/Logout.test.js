import { fireEvent, getByLabelText, getByRole, getByText, queryByText, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LogoutButton from './Logout';
import { customerService } from '../apiUrls';
test("renders correctly", () => {
  render(
    <Router>
        <LogoutButton/>
    </Router>
  );
});