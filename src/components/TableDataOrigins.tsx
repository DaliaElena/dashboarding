import { useState } from 'react';
import { TextField, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TablePagination } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TableDataOriginsProps {
  dataPoints: {
    Name: string;
    lastConnection: string;
    origin: string;
  }[];
}

const TableDataOrigins: React.FC<TableDataOriginsProps> = ({ dataPoints }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

  return (
    <div>

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
                Actions</TableCell>
                
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableDataOrigins;
