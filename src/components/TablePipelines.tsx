import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  IconButton,
  Checkbox
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { styled } from '@mui/system';
import { Col, Row, Modal, Button as ButtonBootstrap } from 'react-bootstrap';
import useDeleteAPI from '../hooks/deleteAPI.tsx';
import { API_URL_PIPELINES, JUPYTER_INSTANCE } from '../config.tsx';

interface TablePipelinesProps {
  dataPoints: string[]; // Adjust this type according to your actual data structure
}

const TablePipelines: React.FC<TablePipelinesProps> = ({ dataPoints }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: string | null }>({
    key: null,
    direction: null,
  });
  const { deleteData } = useDeleteAPI();
  const [apiData, setApiData] = useState<string[]>(dataPoints); // State for storing API data
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedRowIndices, setSelectedRowIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    setApiData(dataPoints);
  }, [dataPoints]);

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

  const CustomButtonNew = styled(ButtonBootstrap)({
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
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      '&:hover fieldset': {
        borderColor: '#BDBDBD',
      },
    },
  });

  const sortData = (a: string, b: string, config: { key: string | null; direction: string | null }) => {
    if (config.key === 'file_name') {
      if (config.direction === 'asc') {
        return a > b ? 1 : -1;
      } else if (config.direction === 'desc') {
        return a < b ? 1 : -1;
      }
    }
    return 0;
  };

  const sortedAndFilteredData = [...apiData]
    .filter((fileName) => fileName.toLowerCase().includes(searchTerm))
    .sort((a, b) => sortData(a, b, sortConfig));

  const handleDeleteSelected = async () => {
    const selectedFileNames = Array.from(selectedRowIndices).map(index => sortedAndFilteredData[index]);
    console.log('Data to be sent for deletion:', selectedFileNames);
    for (const selectedFileName of selectedFileNames) {
      const response = await deleteData(API_URL_PIPELINES, selectedFileName);
      console.log(`Response for deleting ${selectedFileName}:`, response);
    }
    setShowDeleteModal(false);
    setApiData(apiData.filter((fileName) => !selectedFileNames.includes(fileName)));
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
                  onClick={() => setSortConfig({ key: 'file_name', direction: sortConfig.key === 'file_name' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
                >
                  Name{' '}
                  {sortConfig.key === 'file_name' && (
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
              {sortedAndFilteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((fileName, index) => (
                <TableRow key={index}>
                  <TableCell style={{ fontFamily: 'Roboto, sans-serif', color: '#5A6ACF', fontWeight: 400, fontSize: '16px', textAlign: 'left' }}>
                    <span>{fileName}</span>
                  </TableCell>
                  <TableCell>
                    <a href={JUPYTER_INSTANCE}>
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
              Delete
            </ButtonBootstrap>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default TablePipelines;
