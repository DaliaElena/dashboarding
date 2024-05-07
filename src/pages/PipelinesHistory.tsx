import TablePipelines from '../components/TablePipelines.tsx';
import useAPIGET from '../hooks/getAPI.tsx';
import { API_URL_DASHBOARDS } from '../config.tsx';


  
  const MyPipelines = () => {
    const originsData = useAPIGET(API_URL_DASHBOARDS);  
    if (!originsData) {
      return <div>Loading...</div>;
    }

    return (
      <div className='column-dbos-center' style={{ minHeight: '100vh', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F9F9F9' }}>
        <br />
        <h2 style={{marginBottom: '60px' }}>My Pipelines</h2>
        <TablePipelines  dataPoints={originsData}/>
  
      </div>
    );
  };
  
  export default MyPipelines;
  