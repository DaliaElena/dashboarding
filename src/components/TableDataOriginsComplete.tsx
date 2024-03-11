import { useState } from 'react';
import { TextField, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TablePagination, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/system';
import {Col, Row, Modal, Button as ButtonBootstrap, Form, Badge} from 'react-bootstrap';



interface TableDataOriginsCompleteProps {
  dataPoints: {
    Name: string;
    lastConnection: string;
    origin: string;
  }[];
}

const TableDataOriginsComplete: React.FC<TableDataOriginsCompleteProps> = ({ dataPoints: initialDataPoints }) => {
  const [page, setPage] = useState(0);
  const [dataPoints, setDataPoints] = useState<TableDataOriginsCompleteProps['dataPoints']>(initialDataPoints);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' | null }>({ key: null, direction: null });
  // const [emails, setEmails] = useState<string[]>([]);  //ParaCorreosEnShare

  //Para editar correos en el tercer modal
  const [emails, setEmails] = useState<{ email: string; permission: string }[]>([]); // Modificar para almacenar permisos
  const [showTercerModal, setShowTercerModal] = useState(false);


  
  // Función para actualizar los permisos de un correo electrónico
// Función para actualizar los permisos de un correo electrónico
const handlePermissionChange = (email: string, permission: string) => {
  const updatedEmails = emails.map((item) =>
    item.email === email ? { ...item, permission } : item
  );
  setEmails(updatedEmails);
  console.log(updatedEmails); // Agregar console.log aquí
};


   // Otras funciones y estados permanecen igual

   const handleCloseTercerModal = () => setShowTercerModal(false);
   const handleShowTercerModal = () => setShowTercerModal(true);

  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   // Modal share
   const [showLargeModal, setShowLargeModal] = useState(false);
   //const handleCloseLargeModal = () => setShowLargeModal(false);
   const handleShowLargeModal = () => setShowLargeModal(true);
   const handleCloseLargeModal = () => {
    setShowLargeModal(false);
    setEmails([]); // Limpiar correos electrónicos
    // También puedes limpiar el mensaje si lo deseas
  };
  

   //Para que al hacer clic fuera del campo, se agregue el correo

   const handleEmailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim();
  
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (emailRegex.test(value)) {
      setEmails([...emails, value]);
      event.currentTarget.value = ''; // Limpiar el campo de entrada
    } else {
      // Mostrar un mensaje de error o realizar otra acción en caso de que el formato del correo electrónico no sea válido
      console.log('Please enter a valid email');
    }
  };

   // Tercer Modal 
   //const [showTercerModal, setShowTercerModal] = useState(false);
  // const handleCloseTercerModal = () => setShowTercerModal(false);
   //const handleShowTercerModal = () => setShowTercerModal(true);

  // Función para continuar y mostrar el tercer modal
  const handleContinue = () => {
  handleCloseLargeModal(); // Cierra el LargeModal
  handleShowTercerModal(); // Muestra el TercerModal
}



// Para modificar el Botón share

const CustomButtonShare = styled(Button)({
  backgroundColor: '#FFFFFF',
  color: 'gray',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Agregar sombra
  transition: 'box-shadow 0.3s ease', // Transición para hover
  '&:hover': {
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Aumentar la sombra al hacer hover
  },
});


  const CustomButtonExport = styled(Button)({
    backgroundColor: '#FF9E18', // Cambia el color de fondo del botón aquí
    color: '#FFFFFF', // Cambia el color del texto del botón aquí
    '&:hover': {
      backgroundColor: '#FF9E18', // Cambia el color de fondo en hover aquí
    },
  });

  //Para gestion de correos en share

  const handleEmailKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab' || event.key === ',' || event.key === ' ' || event.key === 'Enter' || event.key === 'click') {
      event.preventDefault();
      const value = event.currentTarget.value.trim();
  
      // Expresión regular para validar el formato del correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (emailRegex.test(value)) {
        setEmails([...emails, value]);
        event.currentTarget.value = ''; // Limpiar el campo de entrada
      } else {
        // Mostrar un mensaje de error o realizar otra acción en caso de que el formato del correo electrónico no sea válido
        console.log('Please enter a valid email');
      }
    }
  };



  const handleRemoveEmail = (index: number) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1); // Eliminar el correo electrónico del índice especificado
    setEmails(newEmails);
  };

  const sortedAndFilteredData = [...dataPoints]
    .filter(
      (row) =>
        row.Name.toLowerCase().includes(searchTerm) ||
        row.origin.toLowerCase().includes(searchTerm) ||
        row.lastConnection.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b] ? 1 : -1;
      } else if (sortConfig.direction === 'desc') {
        return a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b] ? 1 : -1;
      }
      return 0;
    });

  const handleSort = (key: string) => {
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction } as { key: string | null; direction: 'asc' | 'desc' });
    setPage(0);
  };

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRowsPerPage(value === 'All' ? dataPoints.length : parseInt(value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setPage(0);
  };

  //Checkbox

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleRowSelect = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
  
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
  
    setSelectedRows(newSelectedRows);
  };
  
  const handleDeleteSelected = () => {
    // Obtén las filas seleccionadas
    const selectedRowsArray = Array.from(selectedRows);
  
    // Filtra las filas seleccionadas de tus datos
    const newDataPoints = dataPoints.filter((_, index) => !selectedRowsArray.includes(index));
  
    // Actualiza los datos y restablece las selecciones
    setDataPoints(newDataPoints);
    setSelectedRows(new Set());
    setShow(true);

  };
  
  const handleExport = () => {
    // Aquí puedes crear el archivo que deseas exportar, por ejemplo, un archivo CSV
    // Luego, puedes crear una URL para el archivo y enlazarla en el botón de exportación
  };


// Para modificar el search

  const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        backgroundColor: '#FFFFFF',
        borderColor: '#BDBDBD', // Cambia el color del borde aquí
        borderWidth: '0.5px', // Cambia el ancho del borde aquí
        width: '130px',
        height: '60px',
        fontSize: '15px', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      },
      '&:hover fieldset': {
        borderColor: '#BDBDBD', // Cambia el color del borde en hover aquí
      },
    },
  });
  

  return (
    <div style={{ overflowX: 'hidden'}}>
      <Row className="align-items-center" style={{marginBottom:'50px'}}>
            <Col xs={2} style={{ textAlign: 'center' }}>
              <CustomTextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
              />
            </Col>

            <Col xs={8} style={{ textAlign: 'center' }}>
              <TablePagination
                className="p-remove-style"
                rowsPerPageOptions={[10, 50, 100, -1]}
                component="div"
                count={sortedAndFilteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Col>

            <Col xs={2} style={{ textAlign: 'center' }}>
              <IconButton className='icon-color' onClick={handleDeleteSelected}>
                <DeleteIcon />
              </IconButton>

            </Col>
                
          </Row>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' , marginBottom: '20px'}}>
            <CustomButtonShare onClick={handleShowLargeModal}>
              Share
            </CustomButtonShare>
            {/* Modal grande */}

        <Modal show={showLargeModal} onHide={handleCloseLargeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Share Data</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
          <Col xs={8}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div style={{ position: 'relative' }}>
                  <Form.Label>Share with</Form.Label>
                  <Form.Control required type="text" placeholder="Enter email" onKeyDown={handleEmailKeyDown} onBlur={handleEmailBlur} />
                  {emails.map((email, index) => (
                    <Badge key={index} className="custom-badge">
                      {email}
                    <ButtonBootstrap onClick={() => handleRemoveEmail(index)} className="custom-close-button">
                      <span aria-hidden="true">&times;</span>
                  </ButtonBootstrap>
                </Badge>
              ))}
            </div>
          </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMessage">
              <Form.Label>Message (optional)</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Add a message" />
            </Form.Group>
          </Form>
         </Col>
         <Col xs={4}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
              <Form.Label>Permissions</Form.Label>
              <Form.Select aria-label="Select Permission">
                <option>Read Only</option>
                <option>Read/Write</option>
                <option>Editor</option>
              </Form.Select>
          </Form.Group>

         </Col>
        </Row>
        </Modal.Body>

        <Modal.Footer>
          <ButtonBootstrap variant="secondary" onClick={handleCloseLargeModal}>
            Cancel
          </ButtonBootstrap>
          <ButtonBootstrap onClick={handleCloseLargeModal} className="custom-button-primary" variant='warning' type="submit"  style={{marginTop: '20px', marginBottom: '20px'}}  disabled={emails.length === 0} // Deshabilitar el botón si no hay correos electrónicos
          >
              Share
        </ButtonBootstrap>
        </Modal.Footer>
        </Modal>

        <Modal show={showTercerModal} onHide={handleCloseTercerModal} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Sharing data origin</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div style={{ marginLeft: '60px' }}>
      <p style={{ fontWeight: '600', marginTop: '20px', marginBottom: '20px' }}>Collaborators</p>
    </div>
    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
      {emails.map((emailObj, index) => (
        <li key={index} style={{ marginBottom: '20px' }}>
          {emailObj.email}
          {/* Selector de permisos */}
          <Form.Select
            value={emailObj.permission}
            onChange={(e) => handlePermissionChange(emailObj.email, e.target.value)}
          >
            <option value="Read Only">Read Only</option>
            <option value="Read/Write">Read/Write</option>
            <option value="Editor">Editor</option>
          </Form.Select>
        </li>
      ))}
    </ul>
  </Modal.Body>
  <Modal.Footer>{/* Botones del segundo modal */}</Modal.Footer>
</Modal>



        <a href="#" download="dataOrigin.csv" onClick={handleExport}>
        <CustomButtonExport variant="contained">
          Export
        </CustomButtonExport>
        </a>

      </div>

      <TableContainer component={Paper}>
        <Table>
        <TableHead>
            <TableRow>
              <TableCell 
                style={{fontFamily: 'Roboto, sans-serif',
                color: '#A7A9AC',
                fontWeight: 600,
                fontSize: '16px',
                textAlign:'left',}}

                onClick={() => handleSort('Name')}>
                Name{' '}
                {sortConfig.key === 'Name' && (
                  sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                )}
              </TableCell>
              
              <TableCell 
                style={{fontFamily: 'Roboto, sans-serif',
                color: '#A7A9AC',
                fontWeight: 600,
                fontSize: '16px',
                textAlign:'left',}}
                
                onClick={() => handleSort('lastConnection')}>
                Last Connection{' '}
                {sortConfig.key === 'lastConnection' && (
                  sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                )}
              </TableCell>

              <TableCell 
                style={{fontFamily: 'Roboto, sans-serif',
                color: '#A7A9AC',
                fontWeight: 600,
                fontSize: '16px',
                textAlign:'left',}}

                onClick={() => handleSort('origin')}>
                Origin{' '}
                {sortConfig.key === 'origin' && (
                  sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                )}
              </TableCell>

              <TableCell 
                style={{fontFamily: 'Roboto, sans-serif',
                color: '#A7A9AC',
                fontWeight: 600,
                fontSize: '16px',
                textAlign:'left',}}>  
                Actions
              </TableCell>


{/* SELECT  */} 
              <TableCell 
                style={{fontFamily: 'Roboto, sans-serif',
                color: '#A7A9AC',
                fontWeight: 600,
                fontSize: '16px',
                textAlign:'left',}}>  
                Select
              </TableCell>
                
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAndFilteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell style={{fontFamily: 'Roboto, sans-serif',
                color: '#5A6ACF',
                fontWeight: 400,
                fontSize: '16px',
                textAlign:'left',}}>
                {row.Name}
                </TableCell>

                <TableCell style={{fontFamily: 'Roboto, sans-serif',
                color: '#58595B',
                fontWeight: 400,
                fontSize: '16px',
                textAlign:'left',}}>
                {row.lastConnection}
                </TableCell> 

                <TableCell style={{fontFamily: 'Roboto, sans-serif',
                color: '#58595B',
                fontWeight: 400,
                fontSize: '16px',
                textAlign:'left',}}>
                {row.origin}
                </TableCell>

                <TableCell>
                  <a href="/AddNewDataOrigin">
                  <IconButton className='icon-color'>
                    <EditIcon />
                  </IconButton>
                  </a>

                  <IconButton className='icon-color' onClick={handleShow}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                  </Modal.Header>
                  <Modal.Body style={{textAlign:'center'}}>Are you sure you want to delete your Data Origin?
                  </Modal.Body>
                  <Modal.Footer>
                  <ButtonBootstrap type="button" className="btn btn-danger">
                      <a href="/DataOriginHistory" style={{textDecoration: "none", color: "inherit"}}> Cancel </a>                  
                    </ButtonBootstrap>
                    <ButtonBootstrap type="button" className="btn btn-secondary">
                      <a href="/DataOriginHistory" style={{textDecoration: "none", color: "inherit"}}> Yes </a>                  
                    </ButtonBootstrap>
                  </Modal.Footer>
                </Modal>

                <TableCell>
                  <Checkbox
                    checked={selectedRows.has(index)}
                    onChange={() => handleRowSelect(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' , marginBottom: '20px', marginTop: '20px', marginRight: '20px'}}>
              <a href="/AddNewDataOrigin">
              <CustomButtonExport variant="contained">
              Add New
              </CustomButtonExport>
              </a>
            </div>
      </TableContainer>
    </div>
  );
};


export default TableDataOriginsComplete;
