import { fireEvent, getByLabelText, getByRole, render, screen, waitFor, queryByText, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the appropriate Router
import ManagerViewUsers from './ManagerViewUsers';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import axiosPrivate from '../../interceptor';
import { managerService } from '../../apiUrls';
import axios from 'axios';

test("renders", () => {
  render(
    <Router>
      <ManagerViewUsers />
    </Router>
);
})

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

describe('ManagerViewUsers Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('renders users based on selected user type', async () => {
    axiosPrivate.get.mockResolvedValueOnce({
      data: {
        results: [
          { name: 'User 1', email: 'user1@example.com' },
          { name: 'User 2', email: 'user2@example.com' },
        ],
        count: 2,
      },
    });

    render(
      <MemoryRouter>
        <ManagerViewUsers />
      </MemoryRouter>
    );

    const userTypeSelect = screen.getByLabelText('Usertype:');
    fireEvent.change(userTypeSelect, { target: { value: 'customer' } });

    const viewButton = screen.getByText('View');
    fireEvent.click(viewButton);

    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.getByText('User 2')).toBeInTheDocument();
    });
  });

  test('handles pagination correctly', async () => {
    axiosPrivate.get.mockResolvedValueOnce({
      data: {
        results: [
          { name: 'User 1', email: 'user1@example.com' },
          { name: 'User 2', email: 'user2@example.com' },
          { name: 'User 3', email: 'user3@example.com' },
        ],
        count: 5,
        next: 'page=3',
        previous: null,
      },
    })
    axiosPrivate.get.mockResolvedValueOnce({
      data: {
        results: [
          { name: 'User 4', email: 'user4@example.com' },
          { name: 'User 5', email: 'user5@example.com' },
        ],
        count: 10,
        next: null,
        previous: 'page=1',
      }})

      axiosPrivate.get.mockResolvedValueOnce({
        data: {
          results: [
            { name: 'User 1', email: 'user1@example.com' },
            { name: 'User 2', email: 'user2@example.com' },
            { name: 'User 3', email: 'user3@example.com' },
          ],
          count: 5,
          next: 'page=3',
          previous: null,
        },
      })
    

    render(
      <MemoryRouter>
        <ManagerViewUsers />
      </MemoryRouter>
    );
    const userTypeSelect = screen.getByLabelText('Usertype:');
    fireEvent.change(userTypeSelect, { target: { value: 'customer' } });
    const viewButton = screen.getByText('View');
    fireEvent.click(viewButton);

    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.getByText('User 2')).toBeInTheDocument();
      expect(screen.getByText('User 3')).toBeInTheDocument();
    });

    const nextPageButton = screen.getByText('Next');
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('User 4')).toBeInTheDocument();
      expect(screen.getByText('User 5')).toBeInTheDocument();
    });

    const previousPageButton = screen.getByText('Previous');
    fireEvent.click(previousPageButton);

    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.getByText('User 2')).toBeInTheDocument();
      expect(screen.getByText('User 3')).toBeInTheDocument();
    });
  });
});
