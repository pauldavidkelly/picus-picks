import { render, screen, fireEvent, userEvent } from '@testing-library/react';
import { WeekSelector } from './WeekSelector';

// Mock the Radix UI components
jest.mock("@/components/ui/select", () => ({
    Select: ({ children, onValueChange, value }: {
        children: React.ReactNode;
        onValueChange?: (value: string) => void;
        value?: string;
    }) => (
        <div 
            data-testid="select-root" 
            data-value={value}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                // Simulate value change when clicked
                const target = e.target as HTMLElement;
                if (target.dataset.value) {
                    onValueChange?.(target.dataset.value);
                }
            }}
        >
            {children}
        </div>
    ),
    SelectTrigger: ({ children, className }: {
        children: React.ReactNode;
        className?: string;
    }) => (
        <button data-testid="week-selector" className={className}>
            {children}
        </button>
    ),
    SelectValue: ({ children }: {
        children: React.ReactNode;
    }) => (
        <span data-testid="select-value">
            {typeof children === 'string' ? children : children || 'Select Week'}
        </span>
    ),
    SelectContent: ({ children }: {
        children: React.ReactNode;
    }) => (
        <div data-testid="select-content">
            {children}
        </div>
    ),
    SelectItem: ({ value, children }: {
        value: string;
        children: React.ReactNode;
    }) => (
        <div 
            role="option" 
            data-value={value}
        >
            {children}
        </div>
    ),
}));

describe('WeekSelector', () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

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

    it('renders regular season week correctly', () => {
        render(<WeekSelector selectedWeek={1} onChange={mockOnChange} />);
        expect(screen.getByText('Week 1')).toBeInTheDocument();
    });

    it('renders Wild Card week correctly', () => {
        render(<WeekSelector selectedWeek={160} onChange={mockOnChange} />);
        expect(screen.getByText('Wild Card')).toBeInTheDocument();
    });

    it('includes both regular season and playoff weeks in dropdown', async () => {
        render(<WeekSelector selectedWeek={1} onChange={mockOnChange} />);
        
        // Open the dropdown
        const trigger = screen.getByTestId('week-selector');
        fireEvent.click(trigger);

        // Check for regular season weeks
        expect(screen.getByText('Week 1')).toBeInTheDocument();
        expect(screen.getByText('Week 18')).toBeInTheDocument();
        
        // Check for Wild Card week
        expect(screen.getByText('Wild Card')).toBeInTheDocument();
    });

    it('calls onChange with correct week code when selecting Wild Card week', async () => {
        render(<WeekSelector selectedWeek={1} onChange={mockOnChange} />);
        
        // Open the dropdown
        const trigger = screen.getByTestId('week-selector');
        fireEvent.click(trigger);

        // Select Wild Card week
        const wildCardOption = screen.getByText('Wild Card');
        fireEvent.click(wildCardOption);

        expect(mockOnChange).toHaveBeenCalledWith(160);
    });
});
