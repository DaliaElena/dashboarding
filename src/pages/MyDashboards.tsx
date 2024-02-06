import TableDashboards from '../components/TableDashboards';

const originsData = [
  {
    "Name": "Demo1",
    "status": "Conectado",
    "lastConnection": "2023-01-01",
    "url": "https://demo1.netjerdbos.cloud/"
  },
  {
    "Name": "Demo",
    "status": "Desconectado",
    "lastConnection": "2023-02-01",
    "url": "https://demo.netjerdbos.cloud/"
  }
];

  
  
  const MyDashboards = () => {
    return (
      <div className='column-dbos-center'>
        <br />
        <h2 style={{marginBottom: '60px' }}>Dashboards</h2>
        <TableDashboards  dataPoints={originsData}/>
  
      </div>
    );
  };
  
  export default MyDashboards;
  