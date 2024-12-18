import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Item from '../interface/Item';  // Asegúrate de importar la interfaz Item correctamente

interface MyProp {
  itemsIn: Item[];
}

export default function BasicTable(props: MyProp) {
  const [rows, setRows] = useState<Item[]>([]);

  useEffect(() => {
    setRows(props.itemsIn);  // Actualiza los rows cuando cambian los props
  }, [props.itemsIn]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hora de inicio</TableCell>
            <TableCell align="right">Hora de fin</TableCell>
            <TableCell align="right">Precipitación</TableCell>
            <TableCell align="right">Humedad</TableCell>
            <TableCell align="right">Nubosidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.dateStart}  {/* Hora de inicio */}
              </TableCell>
              <TableCell align="right">{row.dateEnd}</TableCell>  {/* Hora de fin */}
              <TableCell align="right">{row.precipitation}</TableCell>  {/* Precipitación */}
              <TableCell align="right">{row.humidity}</TableCell>  {/* Humedad */}
              <TableCell align="right">{row.clouds}</TableCell>  {/* Nubosidad */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
