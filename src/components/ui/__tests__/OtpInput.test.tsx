import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OtpInput } from '../OtpInput';

describe('OtpInput Component', () => {
  it('renders 6 segmented input elements with accessible labels', () => {
    render(<OtpInput value="" onChange={() => {}} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
    expect(inputs[0]).toHaveAttribute('aria-label', 'Digit 1 of 6');
    expect(inputs[5]).toHaveAttribute('aria-label', 'Digit 6 of 6');
  });

  it('populates value digits across segmented inputs', () => {
    render(<OtpInput value="123" onChange={() => {}} />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    expect(inputs[0].value).toBe('1');
    expect(inputs[1].value).toBe('2');
    expect(inputs[2].value).toBe('3');
    expect(inputs[3].value).toBe('');
  });

  it('triggers onChange and moves forward on user input', () => {
    const handleChange = vi.fn();
    render(<OtpInput value="" onChange={handleChange} />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '4' } });
    expect(handleChange).toHaveBeenCalledWith('4');
  });

  it('handles paste event of a full 6-digit code', () => {
    const handleChange = vi.fn();
    const handleComplete = vi.fn();
    render(
      <OtpInput value="" onChange={handleChange} onComplete={handleComplete} />
    );
    const inputs = screen.getAllByRole('textbox');

    fireEvent.paste(inputs[0], {
      clipboardData: {
        getData: () => '123456',
      },
    });

    expect(handleChange).toHaveBeenCalledWith('123456');
    expect(handleComplete).toHaveBeenCalledWith('123456');
  });
});
