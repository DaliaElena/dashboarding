import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { styled } from '@mui/system';
import {Col, Row, Modal, Button as ButtonBootstrap} from 'react-bootstrap';
import Checkbox from '@mui/material/Checkbox';



interface TableWorkerCompleteProps {
  dataPoints: {
    Name: string;
    status: string;
    lastConnection: string;
    origin: string;
  }[];
}




const TableWorkerComplete: React.FC<TableWorkerCompleteProps> = ({ dataPoints:initialDataPoints }) => {
  const [page, setPage] = useState(0);
  const [dataPoints, setDataPoints] = useState<TableWorkerCompleteProps['dataPoints']>(initialDataPoints);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: string | null }>({
    key: null,
    direction: null,
  });

  const CustomButtonShare = styled(Button)({
    backgroundColor: '#FFFFFF', // Cambia el color de fondo del botón aquí
    color: 'gray', // Cambia el color del texto del botón aquí
    '&:hover': {
      backgroundColor: '#FFFFFF', // Cambia el color de fondo en hover aquí
    },
  });

  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const CustomButtonExport = styled(Button)({
    backgroundColor: '#FF9E18', // Cambia el color de fondo del botón aquí
    color: '#FFFFFF', // Cambia el color del texto del botón aquí
    '&:hover': {
      backgroundColor: '#FF9E18', // Cambia el color de fondo en hover aquí
    },
  });

  const sortData = (a: any, b: any, config: { key: string | null; direction: string | null }) => {
    if (config.direction === 'asc') {
      return a[config.key!] > b[config.key!] ? 1 : -1;
    } else if (config.direction === 'desc') {
      return a[config.key!] < b[config.key!] ? 1 : -1;
    }
    return 0;
  };

  const sortedAndFilteredData = [...dataPoints]
    .filter(
      (row) =>
        row.Name.toLowerCase().includes(searchTerm) ||
        row.status.toLowerCase().includes(searchTerm) ||
        row.origin.toLowerCase().includes(searchTerm) ||
        row.lastConnection.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => sortData(a, b, sortConfig));

  const handleSort = (key: string) => {
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
    setPage(0);
  };

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
    <div style={{ overflowX:'hidden'}}>
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
        <CustomButtonShare variant="contained">
          Share
        </CustomButtonShare>

        <a href="#" download="dataOrigin.csv" onClick={handleExport}>
        <CustomButtonExport variant="contained">
          Export
        </CustomButtonExport>
        </a>

      </div>

      <div style={{ overflowX: 'auto' }}>

      <TableContainer component={Paper}>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{fontFamily: 'Roboto, sans-serif',
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
              <TableCell style={{fontFamily: 'Roboto, sans-serif',
                color: '#A7A9AC',
                fontWeight: 600,
                fontSize: '16px',
                textAlign:'left',}}
                
                onClick={() => handleSort('status')}>
                Status{' '}
                {sortConfig.key === 'status' && (
                  sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                )}
              </TableCell>
              <TableCell style={{fontFamily: 'Roboto, sans-serif',
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
              <TableCell style={{fontFamily: 'Roboto, sans-serif',
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
              
              <TableCell style={{fontFamily: 'Roboto, sans-serif',
                color: '#A7A9AC',
                fontWeight: 600,
                fontSize: '16px',
                textAlign:'left',}}>
                Actions
                </TableCell>

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
                {row.status}
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
              <a href="/AddNewWorker">
              <CustomButtonExport variant="contained">
              Add New
              </CustomButtonExport>
              </a>
            </div>
      </TableContainer>
      </div>

    </div>
  );
};

export default TableWorkerComplete;