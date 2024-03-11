import { useState } from 'react';
import AddNewDataOriginComponentEditableForm from '../components/AddNewDataOriginComponentEditableForm';

const AddNewDataOriginEditable = () => {
  // Define selectedData here
  const [selectedData, setSelectedData] = useState(null);

  return (
    <div className='column-dbos-center' style={{ minHeight: '100vh', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F9F9F9' }}>
      <h2 style={{textAlign:'left', marginTop:'40px', marginBottom:'40px'}}>Edit Data Origin</h2>

      <AddNewDataOriginComponentEditableForm selectedData={selectedData} />

    </div>
  );
};

export default AddNewDataOriginEditable;
