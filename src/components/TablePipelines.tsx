import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TextField,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/system';
import { Col, Row, Modal, Button as ButtonBootstrap} from 'react-bootstrap';
import useDeleteAPI from '../hooks/deleteAPI.tsx';
import { API_URL_PIPELINES } from '../config.tsx';
import { JUPYTER_INSTANCE } from '../config.tsx';

interface TableDashboardsProps {
  dataPoints: {
    file_name: string;
    last_modification: string;
    size: string;
  }[];
}

const TablePipelines: React.FC<TableDashboardsProps> = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: string | null }>({
    key: null,
    direction: null,
  });
  const { deleteData } = useDeleteAPI();
  const [apiData, setApiData] = useState<any[]>([]); // Estado para almacenar los datos de la API
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedRowIndices, setSelectedRowIndices] = useState<Set<number>>(new Set());

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL_PIPELINES);
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Llamar a la función para cargar los datos cuando el componente se monte
  }, []);

  const handleRowSelect = (index: number) => {
    const newSelectedRowIndices = new Set(selectedRowIndices);
  
    if (newSelectedRowIndices.has(index)) {
      newSelectedRowIndices.delete(index);
    } else {
      newSelectedRowIndices.add(index);
    }
  
    setSelectedRowIndices(newSelectedRowIndices);
  };

  const handleDeleteModalShow = () => {
    setShowDeleteModal(true);
  };
  
  const handleDeleteModalClose = () => setShowDeleteModal(false);

  const CustomButtonNew = styled(Button)({
    backgroundColor: '#FF9E18',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FF9E18',
    },
  });

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

  const sortData = (a: any, b: any, config: { key: string | null; direction: string | null }) => {
    if (config.direction === 'asc') {
      return a[config.key!] > b[config.key!] ? 1 : -1;
    } else if (config.direction === 'desc') {
      return a[config.key!] < b[config.key!] ? 1 : -1;
    }
    return 0;
  };

  const sortedAndFilteredData = [...apiData]
    .filter(
      (row) =>
        (row.file_name && row.file_name.toLowerCase().includes(searchTerm)) ||
        (row.last_modification && row.last_modification.toLowerCase().includes(searchTerm)) ||
        (row.size && row.size.toLowerCase().includes(searchTerm))
    )
    .sort((a, b) => sortData(a, b, sortConfig));
    const handleDeleteSelected = async () => {
      const selectedFileNames = Array.from(selectedRowIndices).map(index => sortedAndFilteredData[index].file_name);
      console.log('Data to be sent for deletion:', selectedFileNames); 
      for (const selectedFileName of selectedFileNames) {
        const response = await deleteData(API_URL_PIPELINES, selectedFileName);
        console.log(`Response for deleting ${selectedFileName}:`, response);
      }
      setShowDeleteModal(false);
    };

    
  return (
    <div>
      <div style={{ overflowX: 'hidden' }}>
        <Row>
          <Col xs={2} style={{ textAlign: 'center' }}>
            <CustomTextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
          </Col>
          <Col xs={8} style={{ textAlign: 'center' }}>
            <TablePagination
              className="p-remove-style"
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={sortedAndFilteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
            />
          </Col>
          <Col xs={2} style={{ textAlign: 'center' }}>
            <IconButton className='icon-color' onClick={handleDeleteModalShow}>
              <DeleteIcon />
            </IconButton>
          </Col>
        </Row>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontFamily: 'Roboto, sans-serif', color: '#A7A9AC', fontWeight: 600, fontSize: '16px', textAlign: 'left' }}
                  onClick={() => setSortConfig({ key: 'Name', direction: sortConfig.key === 'Name' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
                >
                  Name{' '}
                  {sortConfig.key === 'Name' && (
                    sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                  )}
                </TableCell>
                <TableCell
                  style={{ fontFamily: 'Roboto, sans-serif', color: '#A7A9AC', fontWeight: 600, fontSize: '16px', textAlign: 'left' }}
                  onClick={() => setSortConfig({ key: 'status', direction: sortConfig.key === 'status' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
                >
                  Modification{' '}
                  {sortConfig.key === 'status' && (
                    sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                  )}
                </TableCell>
                <TableCell
                  style={{ fontFamily: 'Roboto, sans-serif', color: '#A7A9AC', fontWeight: 600, fontSize: '16px', textAlign: 'left' }}
                  onClick={() => setSortConfig({ key: 'lastConnection', direction: sortConfig.key === 'lastConnection' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
                >
                  Size{' '}
                  {sortConfig.key === 'lastConnection' && (
                    sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                  )}
                </TableCell>
                <TableCell
                  style={{ fontFamily: 'Roboto, sans-serif', color: '#A7A9AC', fontWeight: 600, fontSize: '16px', textAlign: 'left' }}>
                  Actions
                </TableCell>
                <TableCell
                  style={{ fontFamily: 'Roboto, sans-serif', color: '#A7A9AC', fontWeight: 600, fontSize: '16px', textAlign: 'left' }}>
                  Select
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAndFilteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  <TableCell style={{ fontFamily: 'Roboto, sans-serif', color: '#5A6ACF', fontWeight: 400, fontSize: '16px', textAlign: 'left' }}>
                    <span>{row.file_name}</span>
                  </TableCell>
                  <TableCell style={{ fontFamily: 'Roboto, sans-serif', color: '#58595B', fontWeight: 400, fontSize: '16px', textAlign: 'left' }}>
                    {row.size}
                  </TableCell>
                  <TableCell style={{ fontFamily: 'Roboto, sans-serif', color: '#58595B', fontWeight: 400, fontSize: '16px', textAlign: 'left' }}>
                    {row.last_modification}
                  </TableCell>
                  <TableCell>
                    <a href={JUPYTER_INSTANCE}>
                      <IconButton className='icon-color'>
                        <IconButton className='icon-color'>
                          <EditIcon />
                        </IconButton>
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '40px', marginTop: '20px', marginRight: '20px' }}>
            <a href={JUPYTER_INSTANCE}>
              <CustomButtonNew variant="contained">
                Add New
              </CustomButtonNew>
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
    </div>
  );
};

export default TablePipelines;
