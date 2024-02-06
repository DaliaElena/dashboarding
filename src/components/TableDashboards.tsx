import React, { useState } from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import styled from 'styled-components';
import {  Col, Row} from 'react-bootstrap';



interface TableDashboardsProps {
  dataPoints: {
    Name: string;
    status: string;
    lastConnection: string;
    url: string;
  }[];
}

const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
`;

const StyledTableCell = styled(TableCell)`
  cursor: pointer;
`;

const ActionsCell = styled(TableCell)`
  display: flex;
  justify-content: space-between;
`;

const TableDashboards: React.FC<TableDashboardsProps> = ({ dataPoints }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: string | null }>({
    key: null,
    direction: null,
  });

  const handleSort = (key: string) => {
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
    setPage(0);
  };

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  
  

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
    setPage(0);
  };
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
        (row.Name && row.Name.toLowerCase().includes(searchTerm)) ||
        (row.status && row.status.toLowerCase().includes(searchTerm)) ||
        (row.lastConnection && row.lastConnection.toLowerCase().includes(searchTerm)) ||
        (row.url && row.url.toLowerCase().includes(searchTerm))
    )
    .sort((a, b) => sortData(a, b, sortConfig));



  return (
    <div>
      <div style={{ overflowX: 'auto' }}>

<Row>
  <Col xs={4}>
  <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          style={{ margin: '10px 0' }}
        />

  </Col>
  <Col xs={8}>
  <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedAndFilteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
  </Col>
</Row>

        <StyledTableContainer as={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell
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
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    color: '#A7A9AC',
                    fontWeight: 600,
                    fontSize: '16px',
                    textAlign: 'left',
                  }}
                  onClick={() => handleSort('status')}
                >
                  Status{' '}
                  {sortConfig.key === 'status' && (
                    sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                  )}
                </StyledTableCell>
                <StyledTableCell
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
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    color: '#A7A9AC',
                    fontWeight: 600,
                    fontSize: '16px',
                    textAlign: 'left',
                  }}
                >
                  Url
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    color: '#A7A9AC',
                    fontWeight: 600,
                    fontSize: '16px',
                    textAlign: 'left',
                  }}
                >
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAndFilteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      color: '#5A6ACF',
                      fontWeight: 400,
                      fontSize: '16px',
                      textAlign: 'left',
                    }}
                  >
                    {row.Name}
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      color: '#58595B',
                      fontWeight: 400,
                      fontSize: '16px',
                      textAlign: 'left',
                    }}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      color: '#58595B',
                      fontWeight: 400,
                      fontSize: '16px',
                      textAlign: 'left',
                    }}
                  >
                    {row.lastConnection}
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      color: '#58595B',
                      fontWeight: 400,
                      fontSize: '16px',
                      textAlign: 'left',
                    }}
                  >
                    {row.url}
                  </TableCell> 
                  <ActionsCell>
                    <IconButton className='icon-color'>
                      <EditIcon />
                    </IconButton>
                    <IconButton className='icon-color'>
                      <DeleteIcon />
                    </IconButton>
                  </ActionsCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>

      </div>
    </div>
  );
};

export default TableDashboards;
