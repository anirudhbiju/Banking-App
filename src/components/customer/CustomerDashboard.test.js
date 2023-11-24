import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CustomerDashboard from './CustomerDashboard';
import { commonService } from '../../apiUrls';

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
        <CustomerDashboard />
      </Router>
    );
    

    await waitFor(() => {
      expect(getByText(`Welcome ${mockName.name}!`)).toBeInTheDocument();
    });
  });


});