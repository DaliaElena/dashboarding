import {Row} from 'react-bootstrap';
import TableWorker from '../components/TableWorker';
import TableDataOrigins from '../components/TableDataOrigins.tsx';
import ChartWorker from '../components/ChartWorker.tsx'
import Cards from '../components/Cards.tsx'

const workerData = [
  { Name: 'Worker 1', status: 'ON', lastConnection: '2023-01-01', origin: 'Lambda' },
  { Name: 'Worker 2', status: 'OFF', lastConnection: '2023-02-15', origin: 'Delta' },
  { Name: 'Worker 3', status: 'ON', lastConnection: '2023-03-20', origin: 'Alpha' },
  { Name: 'Worker 4', status: 'OFF', lastConnection: '2023-04-05', origin: 'Beta' },
  { Name: 'Worker 5', status: 'ON', lastConnection: '2023-05-10', origin: 'Gamma' },
  { Name: 'Worker 6', status: 'OFF', lastConnection: '2023-06-25', origin: 'Sigma' },
  { Name: 'Worker 7', status: 'ON', lastConnection: '2023-07-12', origin: 'Omega' },
  { Name: 'Worker 8', status: 'OFF', lastConnection: '2023-08-30', origin: 'Theta' },
  { Name: 'Worker 9', status: 'ON', lastConnection: '2023-09-18', origin: 'Kappa' },
  { Name: 'Worker 10', status: 'OFF', lastConnection: '2023-10-03', origin: 'Zeta' },
  { Name: 'Worker 11', status: 'ON', lastConnection: '2023-11-11', origin: 'Epsilon' },
  { Name: 'Worker 12', status: 'OFF', lastConnection: '2023-12-22', origin: 'Iota' },
  { Name: 'Worker 13', status: 'ON', lastConnection: '2024-01-07', origin: 'Delta' },
  { Name: 'Worker 14', status: 'OFF', lastConnection: '2024-02-14', origin: 'Beta' },
  { Name: 'Worker 15', status: 'ON', lastConnection: '2024-03-29', origin: 'Gamma' },
  { Name: 'Worker 16', status: 'OFF', lastConnection: '2024-04-16', origin: 'Sigma' },
  { Name: 'Worker 17', status: 'ON', lastConnection: '2024-05-21', origin: 'Omega' },
  { Name: 'Worker 18', status: 'OFF', lastConnection: '2024-06-08', origin: 'Theta' },
  { Name: 'Worker 19', status: 'ON', lastConnection: '2024-07-25', origin: 'Kappa' },
  { Name: 'Worker 20', status: 'OFF', lastConnection: '2024-08-12', origin: 'Zeta' },
  { Name: 'Worker 21', status: 'ON', lastConnection: '2024-09-27', origin: 'Epsilon' },
  { Name: 'Worker 22', status: 'OFF', lastConnection: '2024-10-15', origin: 'Iota' },
  { Name: 'Worker 23', status: 'ON', lastConnection: '2024-11-30', origin: 'Delta' },
  { Name: 'Worker 24', status: 'OFF', lastConnection: '2024-12-17', origin: 'Beta' },
  { Name: 'Worker 25', status: 'ON', lastConnection: '2025-01-01', origin: 'Gamma' },
  { Name: 'Worker 26', status: 'OFF', lastConnection: '2025-02-08', origin: 'Sigma' },
  { Name: 'Worker 27', status: 'ON', lastConnection: '2025-03-15', origin: 'Omega' },
  { Name: 'Worker 28', status: 'OFF', lastConnection: '2025-04-02', origin: 'Theta' },
  { Name: 'Worker 29', status: 'ON', lastConnection: '2025-05-17', origin: 'Kappa' },
  { Name: 'Worker 30', status: 'OFF', lastConnection: '2025-06-04', origin: 'Zeta' },
  { Name: 'Worker 31', status: 'ON', lastConnection: '2025-07-19', origin: 'Epsilon' },
];
const originsData = [
  { Name: 'Dynatrace_first', lastConnection: '2023-01-01', origin: 'Dynatrace' },
  { Name: 'Dynatrace_1', lastConnection: '2023-02-01', origin: 'Dynatrace' },
  { Name: 'Dynatrace_test', lastConnection: '2023-03-01', origin: 'Dynatrace' },
  { Name: 'Dynatrace_second', lastConnection: '2023-04-01', origin: 'Dynatrace' },
  { Name: 'Dynatrace_2', lastConnection: '2023-05-01', origin: 'Dynatrace' },
  { Name: 'Dynatrace_3', lastConnection: '2023-06-01', origin: 'Dynatrace' },
];

const chartData = [
  { x: "1", y: 10 },
  { x: "2", y: 15 },
  { x: "3", y: 8 },
  { x: "4", y: 12 },
  { x: "5", y: 20 }
];

const Home = () => {
  return (
    <div className='top-space-charts'>

      <Row>
        <h2>Workers History</h2>

        <ChartWorker dataPoints={chartData} />
      </Row>
      <Row>
        <h2>Data Origin Abstract </h2>
        <TableDataOrigins dataPoints={originsData} />
      </Row>

      <Row>
        <h2>Workers Abstract</h2>
        <Row><Cards/></Row>
      <TableWorker dataPoints={workerData} />

      </Row>
      </div>
  );
};



export default Home;

