import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleClick.mockClear();
  });

  function renderLoginForm({ email, password }) {
    return render((
      <LoginForm
        fields={{ email, password }}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));
  }

  it('renders login form', () => {
    const { queryByLabelText, getByText } = renderLoginForm({});

    expect(queryByLabelText('Email')).not.toBeNull();
    expect(queryByLabelText('Password')).not.toBeNull();

    fireEvent.click(getByText('Log In'));

    expect(handleClick).toBeCalled();
  });

  it('listens to input change events', () => {
    const controls = [
      {
        label: 'Email',
        name: 'email',
        origin: '',
        value: 'test@test.com',
      },
      {
        label: 'Password',
        name: 'password',
        origin: '',
        value: 'test',
      },
    ];
    const { getByLabelText } = renderLoginForm({ email: '', password: '' });

    controls.forEach(({
      label, name, origin, value,
    }) => {
      expect(getByLabelText(label).value).toBe(origin);

      fireEvent.change(getByLabelText(label), {
        target: { name, value },
      });

      expect(handleChange).toBeCalledWith({ name, value });
    });
  });
});