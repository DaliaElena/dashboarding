import AddNewDataOriginComponent from '../components/AddNewDataOriginComponent';



const AddNewDataOrigin = () => {
  return (
    <div className='column-dbos-center' style={{ minHeight: '100vh', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F9F9F9' }}>
      <h2 style={{textAlign:'left', marginTop:'40px', marginBottom:'40px'}}>Add New Data Origin</h2>

    <AddNewDataOriginComponent/>

    </div>
  );
};

export default AddNewDataOrigin;
