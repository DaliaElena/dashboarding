import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Para mejores matchers
import Home from './Home'; // Ruta relativa al componente Home

// Mocks para hooks
jest.mock('../hooks/useHomeStore', () => ({
  useHomeStore: jest.fn(),
}));

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  it('muestra "Loading..." mientras los datos están cargando', () => {
    // Usamos `spyOn` para mockear el comportamiento de `useHomeStore`
    jest.spyOn(require('../hooks/useHomeStore'), 'useHomeStore').mockReturnValue({
      chartData: null,
      workersData: null,
      originsData: null,
      setChartData: jest.fn(),
      setWorkersData: jest.fn(),
      setOriginsData: jest.fn(),
    });

    render(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renderiza el contenido principal cuando los datos están disponibles', () => {
    const mockChartData = [{ x: 1, y: 2 }, { x: 2, y: 3 }];
    const mockWorkersData = [{ id: 1, name: 'Worker 1' }];
    const mockOriginsData = [{ id: 1, origin: 'Origin 1' }];

    // Usamos `spyOn` para mockear el comportamiento de `useHomeStore`
    jest.spyOn(require('../hooks/useHomeStore'), 'useHomeStore').mockReturnValue({
      chartData: mockChartData,
      workersData: mockWorkersData,
      originsData: mockOriginsData,
      setChartData: jest.fn(),
      setWorkersData: jest.fn(),
      setOriginsData: jest.fn(),
    });

    render(<Home />);

    // Verificar encabezados
    expect(screen.getByText('Workers History')).toBeInTheDocument();
    expect(screen.getByText('Workers Abstract')).toBeInTheDocument();
    expect(screen.getByText('Data Origin Abstract')).toBeInTheDocument();

  });
});
