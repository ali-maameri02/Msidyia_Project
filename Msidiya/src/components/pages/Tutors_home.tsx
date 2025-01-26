import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import NavBar from '../Landing/NavBar';
import Footer from '../Landing/Footer';
import techer1 from '../../assets/teacher1.png'
import techer2 from '../../assets/teacher2.jpg'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
export default function Tutors() {
  return (
    <>
    <NavBar/>
    <div className="tutorslist mt-20 p-10 ml-20 flex flex-row justify-between flex-wrap gap-5">
    <Card sx={{ maxWidth: 345 ,}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height=""
          className='h-64'
          image={techer1}
          alt="teacher1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            teacher1
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           teacher1 are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Rating name="size-large" defaultValue={2} size="large" readOnly/>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="medium" className='font-bold' variant='contained' color="primary" >
          See More
        </Button>
      </CardActions>
    </Card>
    
    <Card sx={{ maxWidth: 345 }} className='flex flex-col justify-between'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          className='h-64'
          image={techer2}
          alt="teacher1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            teacher1
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           teacher1 are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Rating name="size-large" defaultValue={2} size="large" readOnly/>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="medium" className='font-bold' variant='contained' color="primary" >
          See More
        </Button>
      </CardActions>
    </Card>



    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
                  className='h-64'

          component="img"
          height="140"
          image={techer1}
          alt="teacher1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            teacher1
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           teacher1 are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Rating name="size-large" defaultValue={2} size="large" readOnly/>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="medium" className='font-bold' variant='contained' color="primary" >
          See More
        </Button>
      </CardActions>
    </Card>


    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
                  className='h-64'

          component="img"
          height="140"
          image={techer2}
          alt="teacher1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            teacher1
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           teacher1 are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Rating name="size-large" defaultValue={2} size="large" readOnly/>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="medium" className='font-bold' variant='contained' color="primary" >
          See More
        </Button>
      </CardActions>
    </Card>
    
    </div>
    <Footer/>
    </>
  );
}
