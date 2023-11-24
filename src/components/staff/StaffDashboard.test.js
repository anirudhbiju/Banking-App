import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { commonService } from '../../apiUrls';
import StaffDashboard from './StaffDashboard';

jest.mock('../../apiUrls', () => ({
  commonService: {
    getDash: jest.fn(),
  },
}));

const mockErrorResponse = {
    response: {
      data: 'Sample error message',
    },
  };

describe('CustomerDashboard component', () => {
  test('displays the name on rendering', async () => {
    const mockName = { name: 'John Doe' };
    commonService.getDash.mockResolvedValueOnce({ data: mockName });

    const { getByText } = render(
      <Router>
        <StaffDashboard/>
      </Router>
    );
    

    await waitFor(() => {
      expect(getByText(`Welcome ${mockName.name}!`)).toBeInTheDocument();
    });
  });


});