import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ManagerViewCustomer from './ManagerViewCustomer';
import axiosPrivate from '../../interceptor';

jest.mock('../../interceptor', () => {
  const axiosInstance = {
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
    get: jest.fn(), 
    post: jest.fn()
  };
  return axiosInstance;
});


describe('ViewTransactions Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('handles pagination', async () => {
    axiosPrivate.get
    .mockResolvedValueOnce({
      data: {
        results: [
          { accno: 1, email: 'a@gmail.com', name: 'a', balance: 100 },
          { accno: 2, email: 'b@gmail.com', name: 'b', balance: 100 },
        ],
        next: 'page=3',
        previous: null,
      },
    })
    axiosPrivate.get.mockResolvedValueOnce({
      data: {
        results: [
          { accno: 3, email: 'c@gmail.com', name: 'c', balance: 100 },
          { accno: 4, email: 'd@gmail.com', name: 'd', balance: 100 },
        ],
        next: null,
        previous: 'page=1',
      },
    })
    axiosPrivate.get.mockResolvedValueOnce({
      data: {
        results: [
          { accno: 1, email: 'a@gmail.com', name: 'a', balance: 100 },
          { accno: 2, email: 'b@gmail.com', name: 'b', balance: 100 },
        ],
        next: 'page=3',
        previous: null,
      },
    })

    render(
      <MemoryRouter>
        <ManagerViewCustomer />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('a')).toBeInTheDocument();
      expect(screen.getByText('b')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Next'));

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('c')).toBeInTheDocument();
      expect(screen.getByText('d')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Previous'));

      // // Wait for the previous set of data to load
      // expect(screen.getByText('Name')).toBeInTheDocument();
      // expect(screen.getByText('a')).toBeInTheDocument();
      // expect(screen.getByText('b')).toBeInTheDocument();
      
    });
  });

});
test('renders customer transactions on mount',async () => {
  axiosPrivate.get.mockResolvedValueOnce({
    data: {
      results: [
        { accno: 1, email: 'a@gmail.com', name: 'a', balance: 100 },
        { accno: 2, email: 'b@gmail.com', name: 'b', balance: 100 },
      ],
      next: 'page=3',
      previous: null,
    },
  });

  render(
    <MemoryRouter>
      <ManagerViewCustomer />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
  });
});
