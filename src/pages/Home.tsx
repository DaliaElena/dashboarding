import { Row } from 'react-bootstrap';
import TableWorker from '../components/TableWorker';
import TableDataOrigins from '../components/TableDataOrigins.tsx';
import ChartWorker from '../components/ChartWorker.tsx';
import Cards from '../components/Cards.tsx';
import useAPIGET from '../hooks/getAPI.tsx';
import { API_URL_CHART, API_URL_WORKERS, API_URL_DATA } from '../config.tsx';
import { useEffect, useState } from 'react';

const Home = () => {
  const chartData = useAPIGET(API_URL_CHART);
  const workersData = useAPIGET(API_URL_WORKERS);
  const originsData = useAPIGET(API_URL_DATA);

  if (!chartData || !workersData || !originsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='top-space-charts column-dbos-center' style={{ minHeight: '100vh', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F9F9F9' }}>
      <Row>
        <h2>Workers History</h2>
        <ChartWorker dataPoints={chartData} />
      </Row>
      <Row>
        <h2>Workers Abstract</h2>
        <Row><Cards /></Row>
        <TableWorker dataPoints={workersData} />
      </Row>
      <Row>
        <h2>Data Origin Abstract </h2>
        <TableDataOrigins dataPoints={originsData} />
      </Row>
    </div>
  );
};

export default Home;
