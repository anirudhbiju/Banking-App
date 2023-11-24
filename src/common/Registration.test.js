// import { fireEvent, getByLabelText, render, screen, waitFor } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom'; // Import the appropriate Router
// import Login from './Login';
// import Registration from './Registration';
// import { customerService } from '../apiUrls';



// test("email field renders", () => {
//   const { getByLabelText } =   render(
//     <Router>
//       <Registration />
//     </Router>
//   );
//   expect(getByLabelText("Email:")).toBeInTheDocument();
// });

// test("name field renders", () => {
//     const { getByLabelText } =   render(
//       <Router>
//         <Registration />
//       </Router>
//     );
//     expect(getByLabelText("Name:")).toBeInTheDocument();
//   });

// test("password field renders", () => {
//   const { getByLabelText } =   render(
//     <Router>
//       <Registration />
//     </Router>
//   );
//   expect(getByLabelText("Password:")).toBeInTheDocument();
// });

// test("confirm password field renders", () => {
//   const { getByLabelText } =   render(
//     <Router>
//       <Registration />
//     </Router>
//   );
//   expect(getByLabelText("Confirm Password:")).toBeInTheDocument();
// });

// test("sign up button renders", () => {
//   const { getByRole } =   render(
//     <Router>
//       <Registration />
//     </Router>
//   );
//   expect(getByRole("button")).toBeInTheDocument();
// });

import { fireEvent, getByLabelText, getByRole, getByText, queryByText, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Registration from './Registration';
import { customerService } from '../apiUrls';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test("renders correctly", () => {
  render(
    <Router>
        <Registration/>
    </Router>
  );
});

test("fields should change", () => {
  render(
    <Router>
      <Registration />
    </Router>
  );

  const emailElement = screen.getByLabelText("Email:"); 
  const nameElement = screen.getByLabelText("Name:"); 
  const passwordElement = screen.getByLabelText("Password:");
  const confirmElement = screen.getByLabelText("Confirm Password:");

  const testValue = { 
    email: "anirudhbiju77@gmail.com",
    name: "anirudh",
    password: "123",
    confirm: "123" 
  }

  fireEvent.change(emailElement, { target: { value: testValue.email } });
  fireEvent.change(nameElement, { target: { value: testValue.name } });
  fireEvent.change(passwordElement, { target: { value: testValue.password } });
  fireEvent.change(confirmElement, { target: { value: testValue.confirm } });

  expect(emailElement.value).toBe(testValue.email);
  expect(nameElement.value).toBe(testValue.name);
  expect(passwordElement.value).toBe(testValue.password);
  expect(confirmElement.value).toBe(testValue.confirm);
});

test("fields should not be empty", () => {
  const alertMock = jest.spyOn(window, 'alert');
  alertMock.mockImplementation(() => {}); 
  render(
    <Router>
      <Registration />
    </Router>
  );

  fireEvent.click(screen.getByRole('button'));
  
  expect(alertMock).toHaveBeenCalledWith("Fields cannot be empty!");
  alertMock.mockRestore();
});

test('submits the sign up form with valid input', async () => {
  jest.mock('', () => ({
    customerService: {
      register: jest.fn(), // Mock the function as a Jest mock function
    },
  }));

  const { getByLabelText, getByRole } = render(
    <Router>
      <Registration />
    </Router>
  );

  fireEvent.change(getByLabelText("Email:"), { target: { value: 'angel@gmail.com' } });
  fireEvent.change(getByLabelText("Name:"), { target: { value: 'angel' } });
  fireEvent.change(getByLabelText("Password:"), { target: { value: '123' } });
  fireEvent.change(getByLabelText("Confirm Password:"), { target: { value: '123' } });

  fireEvent.click(getByRole("button"));

  await waitFor(() => {});

  expect(customerService.register).toHaveBeenCalledWith({
    email: 'angel@gmail.com',
    name: 'angel',
    password: '123',
    confirm: '123'
  });
});

test('displays error for invalid email format', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {}); 
  render(
    <Router>
      <Registration />
    </Router>
  );

  fireEvent.change(screen.getByLabelText("Email:"), { target: { value: 'invalidemail' } });
  fireEvent.change(screen.getByLabelText("Name:"), { target: { value: 'validname' } });
  fireEvent.change(screen.getByLabelText("Password:"), { target: { value: 'validpassword' } });
  fireEvent.change(screen.getByLabelText("Confirm Password:"), { target: { value: 'validpassword' } });

  fireEvent.click(screen.getByRole('button'));

  expect(window.alert).toHaveBeenCalledWith("Please match email format!");
});

test('displays error for name with non-alphabetic characters', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {}); 
  render(
    <Router>
      <Registration />
    </Router>
  );

  fireEvent.change(screen.getByLabelText("Email:"), { target: { value: 'validemail@example.com' } });
  fireEvent.change(screen.getByLabelText("Name:"), { target: { value: 'invalid123' } });
  fireEvent.change(screen.getByLabelText("Password:"), { target: { value: 'validpassword' } });
  fireEvent.change(screen.getByLabelText("Confirm Password:"), { target: { value: 'validpassword' } });

  fireEvent.click(screen.getByRole('button'));

  expect(window.alert).toHaveBeenCalledWith("Name must contain only alphabets!");
});

test('displays error for passwords not matching', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {}); 
  render(
    <Router>
      <Registration />
    </Router>
  );

  fireEvent.change(screen.getByLabelText("Email:"), { target: { value: 'validemail@example.com' } });
  fireEvent.change(screen.getByLabelText("Name:"), { target: { value: 'validname' } });
  fireEvent.change(screen.getByLabelText("Password:"), { target: { value: 'password1' } });
  fireEvent.change(screen.getByLabelText("Confirm Password:"), { target: { value: 'password2' } });

  fireEvent.click(screen.getByRole('button'));

  expect(window.alert).toHaveBeenCalledWith("Passwords dont match!");
});
jest.mock('../apiUrls', () => ({
  customerService: {
    register: jest.fn(), // Mock the function as a Jest mock function
  },
}));
test('submits the sign up form with valid input and navigates to /login', async () => {

  const mockResponse = {
    data: 'Registered successfully!',
  };
  customerService.register = jest.fn().mockResolvedValue(mockResponse);
  render(
    <Router>
      <Registration />
    </Router>
  );

  fireEvent.change(screen.getByLabelText("Email:"), { target: { value: 'validemail@example.com' } });
  fireEvent.change(screen.getByLabelText("Name:"), { target: { value: 'validname' } });
  fireEvent.change(screen.getByLabelText("Password:"), { target: { value: 'validpassword' } });
  fireEvent.change(screen.getByLabelText("Confirm Password:"), { target: { value: 'validpassword' } });

  fireEvent.click(screen.getByRole('button'));

  expect(customerService.register).toHaveBeenCalledWith({
    email: 'validemail@example.com',
    name: 'validname',
    password: 'validpassword',
    confirm: 'validpassword',
  });
  await waitFor(() => {
  // Expect the navigation to occur
  expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
  })
});
