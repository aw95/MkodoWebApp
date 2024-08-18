import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import TicketView from '../TicketView';

jest.mock('axios');

const mockData = {
    data: {
        draws: [
            {
                id: 1,
                drawDate: '2024-08-12T00:00:00Z',
                number1: 1,
                number2: 2,
                number3: 3,
                number4: 4,
                number5: 5,
                number6: 6,
                'bonus-ball': 7,
                topPrize: 1000000,
            },
        ],
    },
};

describe('TicketView Component', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue(mockData);
    });

    test('TicketView component renders ', async () => {
        render(<TicketView />);
        await waitFor(() => expect(screen.getByText(/Generate some tickets below and see if you win/i)).toBeInTheDocument());
    });

    test('fetches draw data', async () => {
        render(<TicketView />);
        await waitFor(() => expect(axios.get).toHaveBeenCalledWith('/data.json'));
    });

    test('generates random numbers for lottery ticket', async () => {
        render(<TicketView />);
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

        const button = screen.getByText(/Generate New Ticket/i);
        fireEvent.click(button);

        const numbers = await waitFor(() => screen.getAllByRole('lotteryNumber'));            
        expect(numbers.length).toBe(7);
    });

    test('displays winning message when a winning ticket is generated', async () => {
        render(<TicketView />);
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

        const button = screen.getByText(/Generate New Ticket/i);
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/You've won the Top Prize of/i)).toBeInTheDocument();
        });
    });

    test('displays losing message when a losing ticket is generated', async () => {
        render(<TicketView />);
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

        const button = screen.getByText(/Generate New Ticket/i);
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/Sorry, you're not a winner this time!/)).toBeInTheDocument();
        });
    });
});