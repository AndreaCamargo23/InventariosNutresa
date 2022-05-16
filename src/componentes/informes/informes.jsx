/**
 * Informes de la pagina principal
 */
import react from 'react';
import {Box,Paper} from '@mui/material/';


const HomeAdmin =()=>{

  

    return(
        <div>
          <Paper>
            <Box
                sx={{
                  width: 300,
                  height: 210,
                  backgroundColor: 'primary.dark',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                  borderadius: 5,
                }}
              ></Box>
          </Paper>
          <Paper>
            Informes dos
          </Paper>
        </div>
    );
}

export default HomeAdmin;