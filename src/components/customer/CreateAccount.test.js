import { fireEvent, getByLabelText, getByRole, render, screen, waitFor, queryByText, act } from '@testing-library/react';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom'; // Import the appropriate Router
import Accounts from './CreateAccount';
import React from 'react';
import { customerService } from '../../apiUrls';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));


test("renders accounts", () => {
  render(
    <Router>
      <Accounts />
    </Router>
);
})


beforeEach(() => {
  jest.clearAllMocks();

});

jest.mock('../../apiUrls', () => ({
  customerService: {
    account_view: jest.fn(),
    close_account: jest.fn(),
    account_creation: jest.fn()
  },
}));

describe('Accounts component', () => {

  test('displays alert when closing with existing balance', async () => {
    const alertMock = jest.spyOn(window, 'alert');
    alertMock.mockImplementation(() => {});
    const mockAccountData = [
      { account_no: '123456', status: 'Active', balance: 500 },
    ];
    require('../../apiUrls').customerService.account_view.mockResolvedValue({ data: mockAccountData });
  
    // Mocking the response when attempting to close an account with a balance
    // require('../../apiUrls').customerService.close_account.mockResolvedValue({ data: 'B101' });
    require('../../apiUrls').customerService.close_account.mockResolvedValue({ data: 'Please withdraw the balance to close the account!' });
  
    render(
      <MemoryRouter>
        <Accounts />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      const createAccountText = screen.getByRole('heading', { name: 'Account details' });
      expect(createAccountText).toBeInTheDocument();
    });

    await act(async() => {
      fireEvent.click(screen.getByRole('button'));
    });
  
   
  
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Please withdraw the balance to close the account!');
    });
    alertMock.mockRestore();
    
    await waitFor(() => {
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/staffdash');
    });
  
  
  });

  test('renders CreateAccounts when user has no account', async () => {
    const mockAccountData = [];
    require('../../apiUrls').customerService.account_view.mockResolvedValue({ data: '' });
    require('../../apiUrls').customerService.account_creation.mockResolvedValue({ data: '' });
    render(
    <MemoryRouter>
      <Accounts />
      </MemoryRouter>
      );
    await waitFor(() => {
      const pinInput = screen.getByLabelText('Enter PIN for your new account:')
      fireEvent.change(pinInput, { target: { value: 1234 } });
      fireEvent.click(screen.getByText('Apply'));
      const createAccountText = screen.getByRole('heading', { name: 'Apply For An Account' });
      expect(createAccountText).toBeInTheDocument();
    });
  
  });



  test('renders account details when user has an account', async () => {
    const mockAccountData = [
      { account_no: '123456', status: 'Active', balance: 500 },
    ];
    require('../../apiUrls').customerService.account_view.mockResolvedValue({ data: mockAccountData });

    render(
    <MemoryRouter>
      <Accounts />
      </MemoryRouter>
      );

    expect(await screen.findByText('Account details')).toBeInTheDocument();
  });

  test("fields should not be empty", () => {
    const alertMock = jest.spyOn(window, 'alert');
    alertMock.mockImplementation(() => {}); 
    require('../../apiUrls').customerService.close_account.mockRejectedValue({ response: { data: 'B101' } });
    render(
      <MemoryRouter>
        <Accounts />
      </MemoryRouter>
    );
  
    fireEvent.click(screen.getByRole("button"));
  
    expect(alertMock).toHaveBeenCalledWith('PIN is required!');
    alertMock.mockRestore();
  
    });


});

