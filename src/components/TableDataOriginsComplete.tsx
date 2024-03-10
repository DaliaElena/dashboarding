import { useState } from 'react';
import { TextField, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TablePagination, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/system';
import {Col, Row, Modal, Button as ButtonBootstrap} from 'react-bootstrap';
import useDeleteAPI from '../hooks/deleteDataAPI.tsx';
import { API_URL_DATA } from '../config.tsx';

interface TableDataOriginsCompleteProps {
  dataPoints: {
    Name: string;
    origin: string;
    lastConnection: string;
  }[];
}

const TableDataOriginsComplete: React.FC<TableDataOriginsCompleteProps> = ({ dataPoints: propsDataPoints }) => {
  const [dataPoints] = useState<TableDataOriginsCompleteProps['dataPoints']>(propsDataPoints);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' | null }>({ key: null, direction: null });

  const { deleteData } = useDeleteAPI();

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedRowIndices, setSelectedRowIndices] = useState<Set<number>>(new Set());

  const handleRowSelect = (index: number) => {
    const newSelectedRowIndices = new Set(selectedRowIndices);

    if (newSelectedRowIndices.has(index)) {
      newSelectedRowIndices.delete(index);
    } else {
      newSelectedRowIndices.add(index);
    }

    setSelectedRowIndices(newSelectedRowIndices);
  };

  const handleDeleteSelected = async () => {
    const selectedNames = Array.from(selectedRowIndices).map(index => dataPoints[index].Name);
    const selectedOrigins = Array.from(selectedRowIndices).map(index => dataPoints[index].origin);
    console.log('Data to be sent for deletion:', selectedNames);
    for (let i = 0; i < selectedNames.length; i++) {
      const response = await deleteData(API_URL_DATA, selectedOrigins[i], selectedNames[i]);
      console.log(`Response for deleting ${selectedNames[i]}:`, response);
    }
    setShowDeleteModal(false);
  };
  
  const handleDeleteModalShow = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => setShowDeleteModal(false);

  const CustomButtonShare = styled(Button)({
    backgroundColor: '#FFFFFF',
    color: 'gray',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
  });

  const CustomButtonExport = styled(Button)({
    backgroundColor: '#FF9E18',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FF9E18',
    },
  });

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

  const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        backgroundColor: '#FFFFFF',
        borderColor: '#BDBDBD',
        borderWidth: '0.5px',
        width: '130px',
        height: '60px',
        fontSize: '15px', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      },
      '&:hover fieldset': {
        borderColor: '#BDBDBD',
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
          <IconButton className='icon-color' onClick={handleDeleteModalShow}>
            <DeleteIcon />
          </IconButton>
        </Col>
      </Row>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' , marginBottom: '20px'}}>
        <CustomButtonShare variant="contained">
          Share
        </CustomButtonShare>
        <a href="#" download="dataOrigin.csv" >
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
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#A7A9AC',
                  fontWeight: 600,
                  fontSize: '16px',
                  textAlign:'left',
                }}
                onClick={() => handleSort('Name')}
              >
                Name{' '}
                {sortConfig.key === 'Name' && (
                  sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                )}
              </TableCell>
              
              <TableCell 
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#A7A9AC',
                  fontWeight: 600,
                  fontSize: '16px',
                  textAlign:'left',
                }}
                onClick={() => handleSort('lastConnection')}
              >
                Last Connection{' '}
                {sortConfig.key === 'lastConnection' && (
                  sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                )}
              </TableCell>

              <TableCell 
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#A7A9AC',
                  fontWeight: 600,
                  fontSize: '16px',
                  textAlign:'left',
                }}
                onClick={() => handleSort('origin')}
              >
                Origin{' '}
                {sortConfig.key === 'origin' && (
                  sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                )}
              </TableCell>

              <TableCell 
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#A7A9AC',
                  fontWeight: 600,
                  fontSize: '16px',
                  textAlign:'left',
                }}
              >  
                Actions
              </TableCell>

              <TableCell 
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#A7A9AC',
                  fontWeight: 600,
                  fontSize: '16px',
                  textAlign:'left',
                }}
              >  
                Select
              </TableCell>
                
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAndFilteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell style={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#5A6ACF',
                  fontWeight: 400,
                  fontSize: '16px',
                  textAlign:'left',
                }}>
                  {row.Name}
                </TableCell>

                <TableCell style={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#58595B',
                  fontWeight: 400,
                  fontSize: '16px',
                  textAlign:'left',
                }}>
                  {row.lastConnection}
                </TableCell> 

                <TableCell style={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#58595B',
                  fontWeight: 400,
                  fontSize: '16px',
                  textAlign:'left',
                }}>
                  {row.origin}
                </TableCell>

                <TableCell>
                  <a href="/AddNewDataOrigin">
                    <IconButton className='icon-color'>
                      <EditIcon />
                    </IconButton>
                  </a>

                  <IconButton className='icon-color' onClick={() => handleDeleteModalShow()}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>

                <TableCell>
                  <Checkbox
                    checked={selectedRowIndices.has(index)}
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
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <ButtonBootstrap variant="secondary" onClick={handleDeleteModalClose}>
            Cancel
          </ButtonBootstrap>
          <ButtonBootstrap variant="danger" onClick={handleDeleteSelected}>
            Yes
          </ButtonBootstrap>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableDataOriginsComplete;
