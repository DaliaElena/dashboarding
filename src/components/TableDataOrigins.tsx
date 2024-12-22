import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTableStore } from '../hooks/tableDataOriginsStore';

interface TableDataOriginsProps {
  dataPoints: {
    Name: string;
    lastConnection: string;
    origin: string;
  }[];
}

const TableDataOrigins: React.FC<TableDataOriginsProps> = ({ dataPoints }) => {
  const { page, rowsPerPage, searchTerm, sortConfig, setPage, setSortConfig } = useTableStore();

  const sortedAndFilteredData = [...dataPoints]
    .filter(row => 
      row.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.lastConnection?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.origin?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    .sort((a, b) => {
      // Check if sortConfig.direction is null or not set
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b] ? 1 : -1;
      } else if (sortConfig.direction === 'desc') {
        return a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b] ? 1 : -1;
      }
      return 0; // When direction is null, no sorting
    });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc'; // Declare direction as 'asc', 'desc', or null

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null; // Reset to null to clear sorting
    }

    setSortConfig({ key, direction });
    setPage(0);  // Reset the page number to 0 after sorting
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell 
                onClick={() => handleSort('Name')}>
                Name{' '}
                {sortConfig.key === 'Name' && (
                  sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : 
                  sortConfig.direction === 'desc' ? <ArrowDownwardIcon /> : null
                )}
              </TableCell>
              <TableCell 
                onClick={() => handleSort('lastConnection')}>
                Last Connection{' '}
                {sortConfig.key === 'lastConnection' && (
                  sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : 
                  sortConfig.direction === 'desc' ? <ArrowDownwardIcon /> : null
                )}
              </TableCell>
              <TableCell 
                onClick={() => handleSort('origin')}>
                Origin{' '}
                {sortConfig.key === 'origin' && (
                  sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : 
                  sortConfig.direction === 'desc' ? <ArrowDownwardIcon /> : null
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAndFilteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.Name}</TableCell>
                <TableCell>{row.lastConnection}</TableCell>
                <TableCell>{row.origin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableDataOrigins;
