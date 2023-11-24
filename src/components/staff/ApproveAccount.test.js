import { fireEvent, getByLabelText, getByRole, render, screen, waitFor, queryByText, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the appropriate Router
import React from 'react';
import ApproveAccount from './ApproveAccount';
import { MemoryRouter } from 'react-router-dom';
import axiosPrivate from '../../interceptor';
import { staffService } from '../../apiUrls';




// jest.mock('../../interceptor', () => ({
//   ...jest.requireActual('../../interceptor'),
//   post: jest.fn(),
// }));

// jest.mock('../../apiUrls', () => ({
//   staffService: {
//     pending_account_view: jest.fn(),
//     account_approval: jest.fn(),
//   },
// }));
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

// describe('ApproveAccount Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

  // test('renders account requests and handles pagination', async () => {
  //   const mockData = {
  //     results: [
  //       { accno: 'ACC001', name: 'User 1', email: 'user1@example.com' },
  //       { accno: 'ACC002', name: 'User 2', email: 'user2@example.com' },
  //       // Add more mock data as needed...
  //     ],
  //     count: 10,
  //     next: 'page=2',
  //     previous: null,
  //   };

  //   staffService.pending_account_view.mockResolvedValueOnce({ data: mockData });

  //   render(
  //     <MemoryRouter>
  //       <ApproveAccount />
  //     </MemoryRouter>
  //   );

  //   // Wait for the initial account requests to load
  //   await waitFor(() => {
  //     expect(screen.getByText('ACC001')).toBeInTheDocument();
  //     expect(screen.getByText('ACC002')).toBeInTheDocument();
  //   });

  //   const nextPageButton = screen.getByText('Next');
  //   fireEvent.click(nextPageButton);

  //   // Mock data for the next page
  //   const mockNextPageData = {
  //     results: [
  //       { accno: 'ACC003', name: 'User 3', email: 'user3@example.com' },
  //       { accno: 'ACC004', name: 'User 4', email: 'user4@example.com' },
  //       // Add more mock data as needed...
  //     ],
  //     count: 10,
  //     next: null,
  //     previous: 'page=1',
  //   };

  //   staffService.pending_account_view.mockResolvedValueOnce({ data: mockNextPageData });

  //   fireEvent.click(nextPageButton);

  //   // Wait for the next page account requests to load
  //   await waitFor(() => {
  //     expect(screen.getByText('ACC003')).toBeInTheDocument();
  //     expect(screen.getByText('ACC004')).toBeInTheDocument();
  //   });

  //   // Add more assertions or actions based on your component's functionality
  // });
// });

describe('ViewTransactions Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
 test('renders account requests and handles pagination', async () => {
    const mockData = {
      results: [
        { accno: 'ACC001', name: 'User 1', email: 'user1@example.com' },
        { accno: 'ACC002', name: 'User 2', email: 'user2@example.com' },
        // Add more mock data as needed...
      ],
      count: 10,
      next: 'page=2',
      previous: null,
    };

    axiosPrivate.post.mockResolvedValueOnce({ data: mockData });

    render(
      <MemoryRouter>
        <ApproveAccount />
      </MemoryRouter>
    );

    // Wait for the initial account requests to load
    await waitFor(() => {
      expect(screen.getByText('ACC001')).toBeInTheDocument();
      expect(screen.getByText('ACC002')).toBeInTheDocument();
    });
  });

  test('fetches customer transactions on mount and handles pagination', async () => {
    axiosPrivate.post.mockResolvedValueOnce({
      data: {
        results: [
          { accno: 'ACC001', name: 'User 1', email: 'user1@example.com' },
          { accno: 'ACC002', name: 'User 2', email: 'user2@example.com' },
          // Add more mock data as needed...
        ],
        count: 10,
        next: 'page=3',
        previous: null,
      },
    });
  
    axiosPrivate.post.mockResolvedValueOnce({
      data: {
        results: [
          { accno: 'ACC003', name: 'User 3', email: 'user3@example.com' },
          { accno: 'ACC004', name: 'User 4', email: 'user4@example.com' },
          // Add more mock data as needed...
        ],
        count: 10,
        next: null,
        previous: 'page=1',
      },
    });
  
    axiosPrivate.post.mockResolvedValueOnce({
      data: {
        results: [
          { accno: 'ACC001', name: 'User 1', email: 'user1@example.com' },
          { accno: 'ACC002', name: 'User 2', email: 'user2@example.com' },
          // Add more mock data as needed...
        ],
        count: 10,
        next: 'page=3',
        previous: null,
      },
    });

    render(
      <MemoryRouter>
        <ApproveAccount />
      </MemoryRouter>
    );
  
    // Assuming you're waiting for API call or some data to populate
    await waitFor(() => {
      // Initial data fetch
      expect(screen.getByText('Account no')).toBeInTheDocument();
      expect(screen.getByText('ACC001')).toBeInTheDocument();
      expect(screen.getByText('ACC002')).toBeInTheDocument();
    });
      // Simulate clicking the Next button
      fireEvent.click(screen.getByText('Next'));

      await waitFor(() => {
      // // Wait for the next set of data to load
      expect(screen.getByText('Account no')).toBeInTheDocument();
      expect(screen.getByText('ACC003')).toBeInTheDocument();
      expect(screen.getByText('ACC004')).toBeInTheDocument();

  
      // Add more assertions based on fetched data and pagination functionality
    });

    fireEvent.click(screen.getByText('Previous'));

    await waitFor(() => {
    // // Wait for the next set of data to load
    expect(screen.getByText('Account no')).toBeInTheDocument();
    expect(screen.getByText('ACC001')).toBeInTheDocument();
    expect(screen.getByText('ACC002')).toBeInTheDocument();


    // Add more assertions based on fetched data and pagination functionality
  });

  });

});
