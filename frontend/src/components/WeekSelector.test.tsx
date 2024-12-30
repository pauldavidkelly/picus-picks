import { render, screen } from '@testing-library/react';
import { WeekSelector } from './WeekSelector';
import userEvent from '@testing-library/user-event';

// Mock the Radix UI components
jest.mock("@/components/ui/select", () => ({
    Select: ({ children, onValueChange, value }: any) => (
        <div 
            data-testid="select-root" 
            data-value={value}
            onClick={(e: any) => {
                // Simulate value change when clicked
                if (e.target.dataset.value) {
                    onValueChange?.(e.target.dataset.value);
                }
            }}
        >
            {children}
        </div>
    ),
    SelectTrigger: ({ children, className }: any) => (
        <button data-testid="week-selector" className={className}>
            {children}
        </button>
    ),
    SelectValue: ({ children }: any) => (
        <span data-testid="select-value">
            {typeof children === 'string' ? children : children || 'Select Week'}
        </span>
    ),
    SelectContent: ({ children }: any) => (
        <div data-testid="select-content">
            {children}
        </div>
    ),
    SelectItem: ({ value, children }: any) => (
        <div 
            role="option" 
            data-value={value}
        >
            {children}
        </div>
    ),
}));

describe('WeekSelector', () => {
    it('renders with current week selected', () => {
        render(
            <WeekSelector 
                selectedWeek={1}
                onChange={() => {}}
            />
        );
        const trigger = screen.getByTestId('week-selector');
        expect(trigger).toHaveTextContent('Week 1');
    });

    it('calls onChange when a new week is selected', async () => {
        const mockOnChange = jest.fn();
        render(
            <WeekSelector 
                selectedWeek={1}
                onChange={mockOnChange}
            />
        );
        
        // Open the dropdown
        const trigger = screen.getByTestId('week-selector');
        await userEvent.click(trigger);
        
        // Select week 2
        const week2Option = screen.getByText('Week 2');
        await userEvent.click(week2Option);
        
        expect(mockOnChange).toHaveBeenCalledWith(2);
    });
});
