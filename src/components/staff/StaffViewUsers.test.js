import { fireEvent, getByLabelText, getByRole, render, screen, waitFor, queryByText, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the appropriate Router
import StaffViewUsers from './StaffViewUsers';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import axiosPrivate from '../../interceptor';
import { staffService } from '../../apiUrls';

// test("renders", () => {
//   render(
//     <Router>
//       <StaffViewUsers />
//     </Router>
// );
// })


jest.mock('../../interceptor', () => {
  const axiosInstance = {
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
    post: jest.fn(),
    get: jest.fn()
  };
  return axiosInstance;
});

describe('StaffViewUsers Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders users and handles pagination', async () => {
    const mockData = {
      results: [
        { name: 'User 1', email: 'user1@example.com', accno: 'ACC001', balance: 100 },
        { name: 'User 2', email: 'user2@example.com', accno: 'ACC002', balance: 150 },
        // Add more mock user data as needed...
      ],
      count: 10,
      next: 'page=3',
      previous: null,
    };

    axiosPrivate.get.mockResolvedValueOnce({ data: mockData });
    const mockNextPageData = {
      results: [
        { name: 'User 3', email: 'user3@example.com', accno: 'ACC003', balance: 200 },
        { name: 'User 4', email: 'user4@example.com', accno: 'ACC004', balance: 250 },
        // Add more mock user data as needed...
      ],
      count: 10,
      next: null,
      previous: 'page=1',
    };

    axiosPrivate.get.mockResolvedValueOnce({ data: mockNextPageData });
    const prevmockData = {
      results: [
        { name: 'User 1', email: 'user1@example.com', accno: 'ACC001', balance: 100 },
        { name: 'User 2', email: 'user2@example.com', accno: 'ACC002', balance: 150 },
        // Add more mock user data as needed...
      ],
      count: 10,
      next: 'page=3',
      previous: null,
    };

    axiosPrivate.get.mockResolvedValueOnce({ data: prevmockData });
    render(
      <MemoryRouter>
        <StaffViewUsers />
      </MemoryRouter>
    );

    // Wait for the initial user data to load
    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.getByText('User 2')).toBeInTheDocument();
    });

    const nextPageButton = screen.getByText('Next');
    fireEvent.click(nextPageButton);

    // Wait for the next page user data to load
    await waitFor(() => {
      expect(screen.getByText('User 3')).toBeInTheDocument();
      expect(screen.getByText('User 4')).toBeInTheDocument();
    });

    const prevPageButton = screen.getByText('Previous');
    fireEvent.click(prevPageButton);

    // Wait for the next page user data to load
    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.getByText('User 2')).toBeInTheDocument();
    });

    // Add more assertions as needed for previous button click and further testing
  });
});
