import TableDataOrigins from '../components/TableDataOrigins';

const originsData = [
  { Name: 'Dynatrace_first', lastConnection: '2023-01-01', origin: 'Dynatrace' },
  { Name: 'Dynatrace_1', lastConnection: '2023-02-01', origin: 'Dynatrace' },
  { Name: 'Dynatrace_test', lastConnection: '2023-03-01', origin: 'Dynatrace' },
  { Name: 'Dynatrace_second', lastConnection: '2023-04-01', origin: 'Dynatrace' },
  { Name: 'Dynatrace_2', lastConnection: '2023-05-01', origin: 'Dynatrace' },
  { Name: 'Dynatrace_3', lastConnection: '2023-06-01', origin: 'Dynatrace' },
];


const DataOriginHistory = () => {
  return (
    <div className='column-dbos-center'>
      <br />
      <h1>Data Origin History</h1>
      <TableDataOrigins  dataPoints={originsData}/>

    </div>
  );
};

export default DataOriginHistory;
