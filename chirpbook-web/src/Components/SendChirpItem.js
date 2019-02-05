import React, {Component} from 'react';

import {withStyles, Grid, TextField, Button, ListItem, IconButton} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {AccountCircle} from '@material-ui/icons';

const styles = theme => ({
    chirpSend: {
        margin: '8px',
        width: '100%',
    },
    chirpSendButton: {
        display: 'block',
        marginRight: '-8px',
        marginLeft: 'auto',
    },
    chirpIcon: {
        marginBottom: 'auto',
        marginTop: '8px',
        padding: '0px',
    },
});

class SendChirpItem extends Component
{

    render()
    {
        const {classes} = this.props;

        return (
            <ListItem >
                <IconButton className={classes.chirpIcon}>
                    <Avatar>
                        <AccountCircle />
                    </Avatar>
                </IconButton>

                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-textarea"
                            placeholder="Chirp here!"
                            multiline
                            fullWidth
                            rows="2"
                            rowsMax="8"
                            className={classes.chirpSend}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Button variant="outlined" size="medium" color="primary" className={classes.chirpSendButton}>
                            Chirp
                        </Button>
                    </Grid>
                </Grid>

            </ListItem >
        );

    }
}

export default withStyles(styles)(SendChirpItem);