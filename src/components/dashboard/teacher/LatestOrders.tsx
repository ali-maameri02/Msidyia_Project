// LatestOrders.tsx
import React from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

const orders = [
  { id: 'ORD-007', customer: 'Ekaterina Tankova', date: 'Aug 16, 2024', status: 'Completed' },
  { id: 'ORD-006', customer: 'Cao Yu', date: 'Aug 16, 2024', status: 'Pending' },
  { id: 'ORD-004', customer: 'Alexa Richardson', date: 'Aug 16, 2024', status: 'Completed' },
  { id: 'ORD-003', customer: 'Anje Keizer', date: 'Aug 16, 2024', status: 'Failed' },
  { id: 'ORD-002', customer: 'Clarke Gilbert', date: 'Aug 16, 2024', status: 'Completed' },
  { id: 'ORD-001', customer: 'Adam Denisov', date: 'Aug 16, 2024', status: 'Completed' },
];

const LatestOrders: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Latest Orders
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default LatestOrders;
