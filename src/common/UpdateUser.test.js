import React from 'react';
import { render, screen, fireEvent, waitFor, getByText } from '@testing-library/react';
import UpdateUser from './UpdateUser';
import { managerService, commonService } from '../apiUrls';
import { MemoryRouter, Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Mocking useNavigate from react-router-dom
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
 useNavigate: () => mockedUsedNavigate,
}));

describe('Update Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    render(
        <MemoryRouter>
            <UpdateUser/>
        </MemoryRouter>
    );
  });

  test('updates name value when input changes', () => {
    const { getByLabelText } = render(
    <MemoryRouter>
      <UpdateUser />
      </MemoryRouter>
      );
    const nameInput = getByLabelText('Name:');
    fireEvent.change(nameInput, { target: { value: 'New Name' } });

    expect(nameInput.value).toBe('New Name');
  });

  test('invalid name input', () => {
    const alertMock = jest.spyOn(window, 'alert');
    alertMock.mockImplementation(() => {});
  
    render(
      <MemoryRouter>
        <UpdateUser />
      </MemoryRouter>
    );
  
    fireEvent.click(screen.getByRole('button'));
  
    const nameElement = screen.getByLabelText('Name:');
  
    const testValue = {
      email: 'anirudhbiju77@gmail.com',
      name: 'anirudh12',
    };
  
    fireEvent.change(nameElement, { target: { value: testValue.name } });
  
    const updateButton = screen.getByText('Update');
    fireEvent.click(updateButton);
  
    expect(alertMock).toHaveBeenCalledWith('Name must contain alphabets only!');
    alertMock.mockRestore();
  });

  test('handleEditUserDetails function', async () => {
    jest.mock('../apiUrls', () => ({
      managerService: {
        edit_users_details: jest.fn(),
      },
    }));
    const mockedResponse = { data: 'Updated' };
    managerService.edit_users_details = jest.fn().mockResolvedValue(mockedResponse);

    const { getByText } = render(
    <MemoryRouter>
      <UpdateUser />
      </MemoryRouter>);

fireEvent.click(getByText('Update')); 
    await waitFor(()=>{
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/viewusers");
    })

  });


  test('unable to change readOnly email field', () => {
    render(
      <MemoryRouter>
        <UpdateUser />
      </MemoryRouter>
    );
  
    const emailInput = screen.getByLabelText('Email:');
    const initialEmailValue = emailInput.value;
  
    fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });
  
    // Ensure the email input value remains unchanged
    expect(emailInput.value).toBe(initialEmailValue);
  });
}
);
