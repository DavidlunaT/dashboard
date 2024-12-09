import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item from '../interface/Item'; // Importa la interfaz Item

interface TableWeatherProps {
  itemsIn: Item[]; // Define la propiedad itemsIn como un arreglo de Item
}

export default function TableWeather({ itemsIn }: TableWeatherProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Precipitation</TableCell>
            <TableCell align="right">Humidity</TableCell>
            <TableCell align="right">Clouds</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsIn.map((item, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.dateStart}
              </TableCell>
              <TableCell align="right">{item.dateEnd}</TableCell>
              <TableCell align="right">{item.precipitation}</TableCell>
              <TableCell align="right">{item.humidity}</TableCell>
              <TableCell align="right">{item.clouds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
