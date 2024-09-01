// LatestProducts.tsx
import React from 'react';
import { Card, CardContent, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';

const products = [
  { name: 'Soja & Co. Eucalyptus', date: 'Updated Aug 16, 2024' },
  { name: 'Necessaire Body Lotion', date: 'Updated Aug 16, 2024' },
  { name: 'Ritual of Sakura', date: 'Updated Aug 16, 2024' },
  { name: 'Lancome Rouge', date: 'Updated Aug 16, 2024' },
  { name: 'Erbology Aloe Vera', date: 'Updated Aug 16, 2024' },
];

const LatestProducts: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Latest Products
        </Typography>
        <List>
          {products.map((product, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>{product.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={product.name} secondary={product.date} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default LatestProducts;
