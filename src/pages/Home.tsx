import { Row } from 'react-bootstrap';
import TableWorker from '../components/TableWorker';
import TableDataOrigins from '../components/TableDataOrigins';
import ChartWorker from '../components/ChartWorker';
import Cards from '../components/Cards';
import useAPIGET from '../hooks/getAPI';
import { API_URL_CHART, API_URL_WORKERS, API_URL_DATA } from '../config';
import { useEffect } from 'react';
import { useHomeStore } from '../hooks/useHomeStore';

const Home = () => {
  const {
    chartData,
    workersData,
    originsData,
    setChartData,
    setWorkersData,
    setOriginsData,
  } = useHomeStore();

  const fetchedChartData = useAPIGET(API_URL_CHART);
  const fetchedWorkersData = useAPIGET(API_URL_WORKERS);
  const fetchedOriginsData = useAPIGET(API_URL_DATA);

  useEffect(() => {
    if (fetchedChartData) setChartData(fetchedChartData);
    if (fetchedWorkersData) setWorkersData(fetchedWorkersData);
    if (fetchedOriginsData) setOriginsData(fetchedOriginsData);
  }, [fetchedChartData, fetchedWorkersData, fetchedOriginsData, setChartData, setWorkersData, setOriginsData]);

  if (!chartData || !workersData || !originsData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className='top-space-charts column-dbos-center'
      style={{
        minHeight: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
      }}
    >
      <Row>
        <h2>Workers History</h2>
        <ChartWorker dataPoints={chartData} />
      </Row>
      <Row>
        <h2>Workers Abstract</h2>
        <Row>
          <Cards />
        </Row>
        <TableWorker dataPoints={workersData} />
      </Row>
      <Row>
        <h2>Data Origin Abstract</h2>
        <TableDataOrigins dataPoints={originsData} />
      </Row>
    </div>
  );
};

export default Home;
