import React from 'react';
import { render, screen,  cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import LoginPage from './loginpage';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
    cleanup();
    localStorage.clear();
  });

test('Render the loginpage', async() => {
  render(<BrowserRouter>
  <LoginPage />
  </BrowserRouter>);
    

    const formUsername = screen.getByTestId('username');
    const formPassword = screen.getByTestId('password');
    const submitButton = screen.getByTestId('logbtn');
    
    expect(formUsername).toBeInTheDocument();
    expect(formPassword).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

});

test('Login with empty username and password', async() => {
    const user = userEvent;

    render(<BrowserRouter>
        <LoginPage />
        </BrowserRouter>);
    
    const submitButton = screen.getByTestId('logbtn');
    
    await act (async() => {
    await user.click(submitButton);
    await new Promise(resolve => setTimeout(resolve, 1000));
    }
    );

    expect(screen.getByText('Login failed!')).toBeInTheDocument();
});


test('Login with wrong username and password', async() => {
    const user = userEvent;

    render(<BrowserRouter>
        <LoginPage />
        </BrowserRouter>);

    const formUsername = screen.getByTestId('username');
    const formPassword = screen.getByTestId('password');
    const submitButton = screen.getByTestId('logbtn');

    await act (async() => {
    await user.type(formUsername, 'testuser123');
    await user.type(formPassword, 'testpassword123');
    await user.click(submitButton);
    await new Promise(resolve => setTimeout(resolve, 1000));
    }
    );

    expect(screen.getByText('Login failed!')).toBeInTheDocument();

});

test('Login with correct username and password', async() => {
    const user = userEvent;

    render(<BrowserRouter>
        <LoginPage />
        </BrowserRouter>);

    const formUsername = screen.getByTestId('username');
    const formPassword = screen.getByTestId('password');
    const submitButton = screen.getByTestId('logbtn');

    await act (async() => {
    await user.type(formUsername, 'testiuser');
    await user.type(formPassword, 'testopassword');
    await user.click(submitButton);
    await new Promise(resolve => setTimeout(resolve, 1000));
    }
    );

    expect(screen.getByText('Success!')).toBeInTheDocument();

});
