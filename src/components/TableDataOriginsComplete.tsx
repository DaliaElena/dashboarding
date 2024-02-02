import { useState } from 'react';
import { TextField, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TablePagination, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/system';



import {Col, Row} from 'react-bootstrap';


interface TableDataOriginsProps {
  dataPoints: {
    Name: string;
    lastConnection: string;
    origin: string;
  }[];
}

const TableDataOrigins: React.FC<TableDataOriginsProps> = ({ dataPoints }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' | null }>({ key: null, direction: null });

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
  };

// Para modificar el search

  const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        backgroundColor: '#BDBDBD',
        borderColor: '#A7A9AC', // Cambia el color del borde aquí
        borderWidth: '1px', // Cambia el ancho del borde aquí
        width: '275px',
        height: '60px'
      },
      '&:hover fieldset': {
        borderColor: '#828282', // Cambia el color del borde en hover aquí
      },
    },
  });
  

  return (
    <div>
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
                  <IconButton className='icon-color'>
                    <EditIcon />
                  </IconButton>
                  <IconButton className='icon-color'>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
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
      </TableContainer>
    </div>
  );
};

export default TableDataOrigins;
