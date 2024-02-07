import TableDashboards from '../components/TableDashboards';

const originsData = [
  {
    "Name": "Demo1",
    "status": "Conectado",
    "lastConnection": "2023-01-01",
    "url": "https://demo1.netjerdbos.cloud/"
  },
  {
    "Name": "Demo1",
    "status": "Conectado",
    "lastConnection": "2023-01-01",
    "url": "https://demo1.netjerdbos.cloud/"
  },
  {
    "Name": "Demo1",
    "status": "Conectado",
    "lastConnection": "2023-01-01",
    "url": "https://demo1.netjerdbos.cloud/"
  },
  {
    "Name": "Demo1",
    "status": "Conectado",
    "lastConnection": "2023-01-01",
    "url": "https://demo1.netjerdbos.cloud/"
  },
  {
    "Name": "Demo1",
    "status": "Conectado",
    "lastConnection": "2023-01-01",
    "url": "https://demo1.netjerdbos.cloud/"
  },
  {
    "Name": "Demo1",
    "status": "Conectado",
    "lastConnection": "2023-01-01",
    "url": "https://demo1.netjerdbos.cloud/"
  },
  {
    "Name": "Demo1",
    "status": "Conectado",
    "lastConnection": "2023-01-01",
    "url": "https://demo1.netjerdbos.cloud/"
  },
  {
    "Name": "Demo1",
    "status": "Conectado",
    "lastConnection": "2023-01-01",
    "url": "https://demo1.netjerdbos.cloud/"
  },
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
      <div className='column-dbos-center' style={{ minHeight: '100vh', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F9F9F9' }}>
        <br />
        <h2 style={{marginBottom: '60px' }}>Dashboards</h2>
        <TableDashboards  dataPoints={originsData}/>
  
      </div>
    );
  };
  
  export default MyDashboards;
  