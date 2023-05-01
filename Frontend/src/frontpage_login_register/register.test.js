import React from 'react';
import { render, screen,  waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import App from '../App';
import RegisterPage from './registerpage';
import { BrowserRouter } from 'react-router-dom';

test('Render the page', async() => {
  render(<BrowserRouter>
  <RegisterPage />
  </BrowserRouter>);
    
    //</RegisterPage>const registerbutton = screen.getByTestId('sign in');
   // await userEvent.click(registerbutton);
    const formUsername = screen.getByTestId('username');
    const formPassword = screen.getByTestId('password');
    const submitButton = screen.getByTestId('regbtn');
    
    expect(formUsername).toBeInTheDocument();
    expect(formPassword).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

});

test('Create a test account', async() => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );
      
    const formUsername = screen.getByTestId('username');
    const formPassword = screen.getByTestId('password');
    const submitButton = screen.getByTestId('regbtn');
      
    expect(formUsername).toBeInTheDocument();
    expect(formPassword).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    
    await userEvent.type(formUsername, 'testaajauser');
    await userEvent.type(formPassword, 'testaajapassword');
    await userEvent.click(submitButton);
    await waitFor(() => {
        const regOK = screen.getByTestId('regOK');
        expect(regOK).toBeInTheDocument();
    });
  });
  
  


