import TableWorkerComplete from "../components/TableWorkerComplete.tsx";
import useAPIGET from '../hooks/getAPI.tsx';
import { API_URL_WORKERS } from '../config.tsx';

const WorkersHistory = () => {
  const workerData = useAPIGET(API_URL_WORKERS);
  if (!workerData || !Array.isArray(workerData)) {
    return <div>Loading...</div>;
  }
  return (
    <div className="column-dbos-center" style={{ minHeight: '100vh', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F9F9F9' }}>
      <br/>
      <h2 style={{marginBottom: '60px' }}>Workers History</h2>
      <TableWorkerComplete dataPoints={workerData}/>
    </div>
  );
};

export default WorkersHistory;
