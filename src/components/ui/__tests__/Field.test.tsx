import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Field } from '../Field';

describe('Field Component', () => {
  it('renders label and associates with input through id', () => {
    render(<Field label="Email Address" id="test-email" />);
    const input = screen.getByLabelText(/Email Address/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-email');
  });

  it('displays error message and sets aria-invalid and aria-describedby', () => {
    render(
      <Field
        label="Username"
        id="username"
        error="Username must be at least 3 characters"
      />
    );
    const input = screen.getByLabelText(/Username/i);
    const errorText = screen.getByRole('alert');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'username-error');
    expect(errorText).toHaveTextContent('Username must be at least 3 characters');
  });

  it('renders helper text when no error is present', () => {
    render(
      <Field
        label="Age"
        id="age-field"
        helperText="Must be 18 or older"
      />
    );
    expect(screen.getByText('Must be 18 or older')).toBeInTheDocument();
  });
});
