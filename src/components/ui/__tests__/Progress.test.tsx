import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Progress } from '../Progress';

describe('Progress Component', () => {
  it('renders current step information and ARIA progress values', () => {
    render(<Progress currentStep={2} totalSteps={4} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '2');
    expect(progressBar).toHaveAttribute('aria-valuemax', '4');
    expect(screen.getByText('Step 2 of 4')).toBeInTheDocument();
    expect(screen.getByText('50% Complete')).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    const handleBack = vi.fn();
    render(<Progress currentStep={3} totalSteps={4} onBack={handleBack} />);
    const backBtn = screen.getByLabelText('Go to previous step');
    fireEvent.click(backBtn);
    expect(handleBack).toHaveBeenCalledTimes(1);
  });
});
