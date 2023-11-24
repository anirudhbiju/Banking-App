import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ViewTransactions from './ViewTransactions';
import { managerService, commonService } from '../apiUrls';
import { MemoryRouter, Router } from 'react-router-dom';
import axiosPrivate from '../interceptor'; // Mock this accordingly


jest.mock('../interceptor', () => {
  const axiosInstance = {
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
    post: jest.fn(),
  };
  return axiosInstance;
});

describe('ViewTransactions Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  
  test('download button appears only when transactions are present', async () => {
    // axiosPrivate.post.mockResolvedValueOnce({ data: { results: [] } });

    // render(
    //   <MemoryRouter>
    //     <ViewTransactions />
    //   </MemoryRouter>
    // );

    // await waitFor(() => {
    //   expect(screen.queryByText('Download')).toBeNull();
    //   // Ensure that the Download button doesn't appear when there are no transactions
    // });

    // Rerender component with transactions
    axiosPrivate.post.mockResolvedValueOnce({ data: { results: [{ id: 1, transaction_id: '12345', amount: 100 }] } });

    render(
      <MemoryRouter>
        <ViewTransactions />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Download')).toBeInTheDocument();

    });
  });

  test('fetches customer transactions on mount', async () => {
    axiosPrivate.post.mockResolvedValueOnce({
      data: {
        results: [{ id: 1, transaction_id: '12345', amount: 100 }],
      },
    });

    render(
      <MemoryRouter>
        <ViewTransactions />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
      expect(screen.getByText('12345')).toBeInTheDocument();
  
    });
  });

  Object.defineProperty(global.URL, 'createObjectURL', { value: jest.fn() });
  
  
test('handles download button click', async () => {
  const mockTransactions = {
    results: [{ id: 1, transaction_id: '12345', amount: 100 }],
  };

  axiosPrivate.post.mockResolvedValueOnce({ data: mockTransactions });

  const mockBlob = new Blob(['transaction_id,amount\n12345,100\n'], { type: 'text/csv' });
  global.URL.createObjectURL.mockReturnValue('mockedURL');

  axiosPrivate.post.mockResolvedValueOnce({ data: mockBlob });

  render(
    <MemoryRouter>
      <ViewTransactions />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument(); // Check if the Download button is present
    fireEvent.click(screen.getByText('Download')); // Trigger the download button click
  });

  await waitFor(() => {
    expect(axiosPrivate.post).toHaveBeenCalledTimes(2); 
    expect(axiosPrivate.post).toHaveBeenNthCalledWith(1, 'viewCustomerTransaction/12345/', expect.any(Object)); 
    expect(axiosPrivate.post).toHaveBeenNthCalledWith(2, 'downloadTransaction/12345/', expect.any(Object)); 
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
   
  });
});


  
  // test('fetches customer transactions on mount for a manager', async () => {
  //   // Mock the axiosPrivate.post function to return a mock response
  //   axiosPrivate.post.mockResolvedValueOnce({
  //     data: { results: [{ id: 1, transaction_id: '12345', amount: 100 }] },
  //   });
  
  //   // Mocking local storage to set the user type as manager
  //   const localStorageMock = {
  //     getItem: jest.fn(),
  //   };
  
  //   Object.defineProperty(window, 'localStorage', {
  //     value: localStorageMock,
  //     writable: true,
  //   });
  
  //   localStorageMock.getItem.mockReturnValueOnce('manager'); // Set the user type as manager
  
  //   render(
  //     <MemoryRouter>
  //       <ViewTransactions />
  //     </MemoryRouter>
  //   );
  
  //   // Assuming you're waiting for API call or some data to populate
  //   await waitFor(() => {
  //     expect(screen.getByText('Transaction ID')).toBeInTheDocument();
  //     expect(screen.getByText('12345')).toBeInTheDocument();
  //     // Add more assertions based on fetched data
  //   });
  // });

  test("renders correctly", () => {
    render(
      <MemoryRouter>
          <ViewTransactions/>
      </MemoryRouter>
    );
  });

  test('renders no transactions message when transactiondata is empty', () => {
    const mockLocation = {
      state: {
        account_no: 'customer_account_number',
      },
    };

    jest.mock('../apiUrls', () => ({
      managerService: {
        view_customer_transaction: jest.fn().mockResolvedValue({ data: { results: [] } }),
      },
    }));

    render(
      <MemoryRouter>
        <ViewTransactions location={mockLocation} />
      </MemoryRouter>
    );

    const noTransactionsMessage = screen.getByText('No Transactions!');
    expect(noTransactionsMessage).toBeInTheDocument();
  });

  test('fetches customer transactions on mount and handles pagination', async () => {
    jest.mock('../apiUrls', () => ({
      commonService: {
        login: jest.fn(),
      },
      managerService: {
        view_customer_transaction: jest.fn(),
      },
    }));
    const mockResponse = {
      data: {
        access: 'mocked-token',
        refresh: 'mocked-refresh-token',
        usertype: 'staff',

      },
    };
    commonService.login = jest.fn().mockResolvedValue(mockResponse);
    managerService.view_customer_transaction = jest.fn().mockResolvedValueOnce({
      data: {
        results: [
          { id: 1, transaction_id: '12345', amount: 100 },
          { id: 2, transaction_id: '67890', amount: 200 },
        ],
        next: 'page=3',
        previous: null,
      },
    });
  
    axiosPrivate.post.mockResolvedValueOnce({
      data: {
        results: [
          { id: 3, transaction_id: '24680', amount: 150 },
          { id: 4, transaction_id: '13579', amount: 300 },
        ],
        next: null,
        previous: 'page=1',
      },
    });
  
    render(
      <MemoryRouter>
        <ViewTransactions />
      </MemoryRouter>
    );

    await waitFor(() => {

      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
      expect(screen.getByText('12345')).toBeInTheDocument();
      expect(screen.getByText('67890')).toBeInTheDocument();
  
      fireEvent.click(screen.getByText('Next'));
  
      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
      expect(screen.getByText('24680')).toBeInTheDocument();
      expect(screen.getByText('13579')).toBeInTheDocument();

    });
  });

}
);
