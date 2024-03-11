import { useState } from 'react';
import { TextField, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TablePagination, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/system';
import { Col, Row, Modal, Button as ButtonBootstrap, Form, Badge } from 'react-bootstrap';
import useDeleteAPI from '../hooks/deleteDataAPI.tsx';
import { API_URL_DATA } from '../config.tsx';
import { Link } from 'react-router-dom';

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
  const [emails, setEmails] = useState<{ email: string; permission: string }[]>([]);
  const [showTercerModal, setShowTercerModal] = useState(false);
  const { deleteData } = useDeleteAPI();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedRowIndices] = useState<Set<number>>(new Set());

  const handlePermissionChange = (email: string, permission: string) => {
    const updatedEmails = emails.map((item) =>
      item.email === email ? { ...item, permission } : item
    );
    setEmails(updatedEmails);
  };

  const handleCloseTercerModal = () => setShowTercerModal(false);
  // const handleShowTercerModal = () => setShowTercerModal(true);

  const handleDeleteSelected = async () => {
    const selectedNames = Array.from(selectedRowIndices).map(index => dataPoints[index].Name);
    const selectedOrigins = Array.from(selectedRowIndices).map(index => dataPoints[index].origin);
    for (let i = 0; i < selectedNames.length; i++) {
      const response = await deleteData(API_URL_DATA, selectedOrigins[i], selectedNames[i]);
      alert(`Response for deleting ${selectedNames[i]}: ${response}`);
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

  const [showLargeModal, setShowLargeModal] = useState(false);
  const handleShowLargeModal = () => setShowLargeModal(true);
  const handleCloseLargeModal = () => {
    setShowLargeModal(false);
    setEmails([]);
  };

  const handleEmailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      setEmails([...emails, { email: value, permission: '' }]);
      event.currentTarget.value = '';
    } else {
      console.log('Please enter a valid email blur');
    }
  };

  // const handleContinue = () => {
  //   handleCloseLargeModal();
  //   handleShowTercerModal();
  // }
  const handleRowSelect = (index: number) => {
    if (index != 0 ){
      console.log("index")
    }
    // Handle export logic
  }

  const handleExport = () => {
    // Handle export logic
  }

  const CustomButtonExport = styled(Button)({
    backgroundColor: '#FF9E18',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FF9E18',
    },
  });

  const handleEmailKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab' || event.key === ',' || event.key === ' ' || event.key === 'Enter' || event.key === 'click') {
      event.preventDefault();
      const value = event.currentTarget.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        setEmails([...emails, { email: value, permission: '' }]);
        event.currentTarget.value = '';
      } else {
        console.log('Please enter a valid email KeyDown');
      }
    }
  };

  const handleRemoveEmail = (index: number) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
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
    <div style={{ overflowX: 'hidden' }}>
      <Row className="align-items-center" style={{ marginBottom: '50px' }}>
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

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px' }}>

        <CustomButtonShare onClick={handleShowLargeModal}>
          Share
        </CustomButtonShare>

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
                      {emails.map((emailObj, index) => (
                          <Badge key={index} className="custom-badge">
                            {emailObj.email} {/* Render the email property */}
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
            <ButtonBootstrap onClick={handleCloseLargeModal} className="custom-button-primary" variant='warning' type="submit" style={{ marginTop: '20px', marginBottom: '20px' }} disabled={emails.length === 0}>
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
                  {emailObj.email} {/* Render the email property directly */}
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
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#A7A9AC',
                  fontWeight: 600,
                  fontSize: '16px',
                  textAlign: 'left',
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
                  textAlign: 'left',
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
                  textAlign: 'left',
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
                  textAlign: 'left',
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
                  textAlign: 'left',
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
                  textAlign: 'left',
                }}>
                  {row.Name}
                </TableCell>

                <TableCell style={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#58595B',
                  fontWeight: 400,
                  fontSize: '16px',
                  textAlign: 'left',
                }}>
                  {row.lastConnection}
                </TableCell>

                <TableCell style={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#58595B',
                  fontWeight: 400,
                  fontSize: '16px',
                  textAlign: 'left',
                }}>
                  {row.origin}
                </TableCell>

                <TableCell>
                  <Link to={`/AddNewDataOriginEditable?Name=${row.Name}&origin=${row.origin}&lastConnection=${row.lastConnection}`}>
                    <IconButton className='icon-color'>
                      <EditIcon />
                    </IconButton>
                  </Link>
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px', marginTop: '20px', marginRight: '20px' }}>
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
