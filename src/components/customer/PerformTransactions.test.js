import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PerformTransactions from './PerformTransactions';
import axiosPrivate from '../../interceptor';
import { MemoryRouter } from 'react-router-dom';

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

describe('PerformTransactions component', () => {
//   beforeEach(() => {
//     axiosPrivate.post.mockClear();
//   });

beforeEach(() => {
  jest.clearAllMocks();
});

test('valid amount', async () => {
  const alertMock = jest.spyOn(window, 'alert');
  alertMock.mockImplementation(() => {});
  axiosPrivate.post.mockResolvedValue({ data: 'Deposit successful!' });
  render(
    <MemoryRouter>
      <PerformTransactions />
    </MemoryRouter>
  );


  await waitFor(() => {
    const typeInput = screen.getByRole('combobox');
    const amountInput = screen.getByLabelText('Enter amount:');
    fireEvent.change(typeInput, { target: { value: 'deposit' } });
    fireEvent.change(amountInput, { target: { value: 100 } });
    console.log(">>>>>>>>>>>>>>",amountInput.value)
    console.log(">>>>>>>>>>>>>>",typeInput.value)
  })
  // await waitFor(() => {
  //   // Simulate user input of an invalid amount, for example, a string instead of a number
  //   const typeInput = screen.getByRole('combobox');
  //   fireEvent.change(typeInput, { target: { value: 'deposit' } });
  //   const amountInput = screen.getByLabelText('Enter amount:');
  //   fireEvent.change(amountInput, { target: { value: 100 } });

  //   // Click the submit button to trigger the transaction attempt
 
  // });
    // Assert that window.alert was called with the expected message
    await waitFor(() => {
      fireEvent.click(screen.getByText('Submit'));
      expect(alertMock).toHaveBeenCalledWith('Deposit successful!');
    });
});

  test('displays alert for invalid amount', async () => {
    const alertMock = jest.spyOn(window, 'alert');
    alertMock.mockImplementation(() => {});
    axiosPrivate.post.mockResolvedValueOnce({ data: {
      "account_no": 95457112639533,
      "pin": 1234,
      "balance": 0.0,
      "status": "Active",
      "userid": 65
  } });
    render(
      <MemoryRouter>
        <PerformTransactions />
      </MemoryRouter>
    );

    await waitFor(() => {
      // Simulate user input of an invalid amount, for example, a string instead of a number
      const typeInput = screen.getByRole('combobox');
      fireEvent.change(typeInput, { target: { value: 'Deposit' } });
      const amountInput = screen.getByLabelText('Enter amount:');
      fireEvent.change(amountInput, { target: { value: 0 } });

   
    });
    fireEvent.click(screen.getByText('Submit'));
      await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith('Amount must contain only digits!');
      });
  });


  
  
  test('renders PerformTransactions component when account is present', async () => {

    axiosPrivate.post.mockResolvedValueOnce({ data: { account_no: 123, balance: 500, status: 'active' } });

    render(<MemoryRouter>
        <PerformTransactions />
        </MemoryRouter>);
    await waitFor(() => {
      expect(screen.getByText('Perform Transaction')).toBeInTheDocument();
      expect(screen.getByLabelText('Enter amount:')).toBeInTheDocument();
    });
  });

  test('displays create account message when account details are null', async () => {
    const alertMock = jest.spyOn(window, 'alert');
    alertMock.mockImplementation(() => {});
    axiosPrivate.post.mockResolvedValueOnce({ reponse :{ data:'B100' }});

    render(
    <MemoryRouter>
        <PerformTransactions />
        </MemoryRouter>);
        // expect(alertMock).toHaveBeenCalledWith('');
await waitFor(() => {
    const createAccountText = screen.getByRole('heading', { name: 'Create an account to perform transactions' });
    expect(createAccountText).toBeInTheDocument();
  });
  // await waitFor(() => {
  //   expect(alertMock).toHaveBeenCalledWith('');
  // });
  });
  // Add more test cases for different scenarios like handling transaction, validation, etc.
});

