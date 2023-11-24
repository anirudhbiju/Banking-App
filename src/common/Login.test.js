import { fireEvent, getByLabelText, getByRole, render, screen, waitFor, queryByText, act } from '@testing-library/react';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom'; // Import the appropriate Router
import { createMemoryHistory } from 'history';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { commonService } from '../apiUrls';
import * as apiUrls from '../apiUrls';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test("fields should change", () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const emailElement = screen.getByLabelText("Email:"); 
  const passwordElement = screen.getByLabelText("Password:");

  const testValue = { 
    email:"anirudhbiju77@gmail.com",
    password:"123"
  }

  fireEvent.change(emailElement, { target: { value: testValue.email } });
  fireEvent.change(passwordElement, { target: { value: testValue.password } });

  expect(passwordElement.value).toBe(testValue.password);
  expect(emailElement.value).toBe(testValue.email); 
});

test("fields should not be empty", () => {
  const alertMock = jest.spyOn(window, 'alert');
  alertMock.mockImplementation(() => {}); 
  render(
    <Router>
      <Login />
    </Router>
  );

  fireEvent.click(screen.getByRole("button"));

  expect(alertMock).toHaveBeenCalledWith("please provide credentials!");
  alertMock.mockRestore();

  });

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  jest.mock('../apiUrls', () => ({
    commonService: {
      login: jest.fn(),
    },
  }));
  
  // jest.mock('react-router-dom', () => ({
  //   ...jest.requireActual('react-router-dom'),
  //   useNavigate: jest.fn(),
  // }));
  
  it('should render login form', () => {
    render(
      <Router>
        <Login/>
      </Router>
    );

    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });


  test("should display error message for invalid email format", () => {
    const alertMock = jest.spyOn(window, 'alert'); 
    alertMock.mockImplementation(() => {});
  
    render(
      <Router>
        <Login />
      </Router>
    );
  
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
 
    expect(alertMock).toHaveBeenCalledWith('Please match email format!'); 
    alertMock.mockRestore();
  });

  it('should navigate to /custdash after successful customer login', async () => {
    const mockResponse = {
      data: {
        access: 'mocked-token',
        refresh: 'mocked-refresh-token',
        usertype: 'customer',
      },
    };
    commonService.login = jest.fn().mockResolvedValue(mockResponse);
    // const mockNavigate = jest.fn();
    // useNavigate.mockReturnValue(mockNavigate);
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await act(async () => {
      expect(commonService.login).toHaveBeenCalledWith({
        email: 'validemail@example.com',
        password: 'validpassword',
      });

      await waitFor(() => {
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/custdash');
      })
    });
  });

  it('should navigate to /staffdash after successful staff login', async () => {
    const mockResponse = {
      data: {
        access: 'mocked-token',
        refresh: 'mocked-refresh-token',
        usertype: 'staff',

      },
    };

    commonService.login = jest.fn().mockResolvedValue(mockResponse);
    // const mockNavigate = jest.fn();
    // useNavigate.mockReturnValue(mockNavigate);
    render(
      <Router>
      <Login />
      </Router>
    );

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await act(async () => {
      expect(commonService.login).toHaveBeenCalledWith({
        email: 'validemail@example.com',
        password: 'validpassword',
      });
      await waitFor(() => {
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/staffdash');
      })
    });
  });

  it('should navigate to /managerdash after successful manager login', async () => {
    
    const mockResponse = {
      data: {
        access: 'mocked-token',
        refresh: 'mocked-refresh-token',
        usertype: 'manager',

      },
    };

    commonService.login = jest.fn().mockResolvedValue(mockResponse);
    // const mockNavigate = jest.fn();
    // useNavigate.mockReturnValue(mockNavigate);
    render(
      <Router>
      <Login />
      </Router>
    );

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await act(async () => {
      expect(commonService.login).toHaveBeenCalledWith({
        email: 'validemail@example.com',
        password: 'validpassword',
      });
      await waitFor(() => {
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/managerdash');
      })
    });
  });

  it('invalid credentials', async () => {
    const alertMock = jest.spyOn(window, 'alert');
    alertMock.mockImplementation(() => {}); 
    const mockResponse = {
      data: '',
    };

    commonService.login = jest.fn().mockResolvedValue();
    // const mockNavigate = jest.fn();
    // useNavigate.mockReturnValue(mockNavigate);
    render(
      <MemoryRouter>
      <Login />
      </MemoryRouter>
    );



    await waitFor(()=>{
      const emailInput = screen.getByLabelText('Email:');
      const passwordInput = screen.getByLabelText('Password:');
      fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    });
fireEvent.click(screen.getByRole('button', { name: 'Login' }));
      await waitFor(()=>{
      
      expect(alertMock).toHaveBeenCalledWith('Invalid credentials');
    })

    alertMock.mockRestore();
    // await act(async () => {
    //   expect(commonService.login).toHaveBeenCalledWith({
    //     email: 'validemail@example.com',
    //     password: 'validpassword',
    //   });

    // });
  });

});

