import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axiosPrivate from '../../interceptor'; 
import { MemoryRouter } from 'react-router-dom';
import CustomerViewTransactions from './CustomerViewTransactions';

test("renders correctly", () => {
  render(
    <MemoryRouter>
        <CustomerViewTransactions/>
    </MemoryRouter>
  );
});

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

Object.defineProperty(global.URL, 'createObjectURL', { value: jest.fn() });

test('handles download button click', async () => {
  const mockTransactions = {
    results: [{ id: 1, transaction_id: '12345', amount: 100 }],
  };

  axiosPrivate.get.mockResolvedValueOnce({ data: mockTransactions }); 
  axiosPrivate.post.mockResolvedValueOnce({ data: 'mocked CSV content' }); 

  global.URL.createObjectURL.mockReturnValue('mockedURL');

  render(
    <MemoryRouter>
      <CustomerViewTransactions />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument(); 
  });

  await waitFor(() => {
    fireEvent.click(screen.getByText('Download')); 
    expect(axiosPrivate.get).toHaveBeenCalledTimes(1); 
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
  });
});




describe('CustomerViewTransactions Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders no transactions message when no data is present', async () => {
    axiosPrivate.get.mockResolvedValueOnce({
      data: {
        results: [],
        count: 0,
      },
    });

    render(
      <MemoryRouter>
        <CustomerViewTransactions />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No Transactions!')).toBeInTheDocument();
    });
  });

  test('renders and handles pagination correctly', async () => {
    axiosPrivate.get.mockResolvedValueOnce({
        data: {
          results: [
            {   id: 1,
                transaction_id: '123abc',
                account_no: 'AC123',
                amount: 100,
                type: 'Credit',
                timestamp: '2023-11-20T12:00:00Z', },
            {   id: 2,
                transaction_id: '123ab',
                account_no: 'AC123',
                amount: 100,
                type: 'Credit',
                timestamp: '2023-11-20T12:00:00Z',},
          ],
          next: 'page=3',
          previous: null,
          count: 10,
        },
      })
      
      axiosPrivate.get.mockResolvedValueOnce({
        data: {
          results: [
            {   id: 3,
                transaction_id: '123abcd',
                account_no: 'AC123',
                amount: 100,
                type: 'Credit',
                timestamp: '2023-11-20T12:00:00Z', },
            {   id: 4,
                transaction_id: '123abcde',
                account_no: 'AC123',
                amount: 100,
                type: 'Credit',
                timestamp: '2023-11-20T12:00:00Z',},
          ],
          next: null,
          previous: 'page=1',
          count: 10,
        },
      });

    render(
      <MemoryRouter>
        <CustomerViewTransactions />
      </MemoryRouter>
    );

    // Wait for data to be rendered
    await waitFor(() => {
      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
      expect(screen.getByText('123abc')).toBeInTheDocument();
      expect(screen.getByText('123ab')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Next'));

      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
      expect(screen.getByText('123abcd')).toBeInTheDocument();
      expect(screen.getByText('123abcde')).toBeInTheDocument();
    });
  });


});
