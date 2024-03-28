import AddNewDataOriginComponentEditableForm from '../components/AddNewDataOriginComponentEditableForm';

const AddNewDataOriginEditable = () => {

  return (
    <div className='column-dbos-center' style={{ minHeight: '100vh', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F9F9F9' }}>
      <h2 style={{textAlign:'left', marginTop:'40px', marginBottom:'40px'}}>Edit Data Origin</h2>

      <AddNewDataOriginComponentEditableForm />

    </div>
  );
};

export default AddNewDataOriginEditable;
