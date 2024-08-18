import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import List from '../List';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

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

describe('List Component', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue(mockData);
    });

    test('List component renders ', async () => {
        render(
            <List />
        );
        await waitFor(() => expect(screen.getByText(/Are you a winner\? Check the results below to find out/i)).toBeInTheDocument());
    });

    test('fetches draw data', async () => {
        render(
             <List />
        );
        await waitFor(() => expect(axios.get).toHaveBeenCalledWith('/data.json'));
        await waitFor(() => expect(screen.getByText(/Draw for Monday/i)).toBeInTheDocument());
    });
});