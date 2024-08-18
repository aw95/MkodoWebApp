import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useLocation } from 'react-router-dom';
import View from '../View';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
    useLocation: jest.fn(),
}));

const mockState = {
    state: {
        draw: {
            id: 1,
            drawDateWeekday: 'Monday',
            drawDateDay: 12,
            drawDateMonth: 'August',
            drawDateYear: 2024,
            number1: 1,
            number2: 2,
            number3: 3,
            number4: 4,
            number5: 5,
            number6: 6,
            bonusBall: 7,
            topPrize: '1,000,000',
        },
    },
};

beforeEach(() => {
    useLocation.mockReturnValue(mockState);
});
test('renders View component with draw details', async () => {
    render(
        <View />
    );

    await waitFor(() => expect(screen.getByText('Draw for Monday 12 August 2024')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('1 2 3 4 5 6')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('7')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Top Prize of /i)).toBeInTheDocument());
});