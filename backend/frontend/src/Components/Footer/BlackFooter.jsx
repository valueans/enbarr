import React from 'react'
import { Grid,Typography} from '@mui/material'
import SocialLinksHorizontal from '../SocialLinks/SocialLinksHorizontal'
import StoreLinks from '../SocialLinks/StoreLinks'
import Footer from './Footer'

const BlackFooter = () => {
    const styles = {
        storeLinks: {
            justifyContent: 'flex-end',
            '@media (max-width: 600px)': {
                justifyContent: 'start',
            },
        },
        storeLinksWrapper: {
            padding:"20px",
            '@media (max-width: 600px)': {
                paddingLeft: '0px',
                paddingRight: '0px'
            }
        }
    }
  return (
    <Grid container sx={{width:"100%",minHeight:"259px",mt:5,background: "linear-gradient(180deg, #313033 0%, #000000 100%)",padding:"30px"}}>
        <Grid item xs={12} lg={6}>
            <Grid container direction="column" spacing={1}>
                <Grid item xs={6}>
                    <Typography variant="enbarTitleWhite">
                        ENBARR
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <SocialLinksHorizontal />
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} lg={6} sx={styles.storeLinksWrapper} >
            <StoreLinks color="#FFFFFF" sx={styles.storeLinks} className="justifyContentEnd"/>
        </Grid>
        <Grid item xs={12}>
            <Footer color="#FFFFFF"/>
        </Grid>
    </Grid>
  )
}

export default BlackFooter