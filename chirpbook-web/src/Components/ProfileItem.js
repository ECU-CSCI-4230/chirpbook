import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class ProfileMenuItem extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            anchorEl: null,
            profilePicture: null,
        };
        this.getProfilePicture.bind(this);
    }

    componentWillMount()
    {
        this.getProfilePicture();
    }

    getProfilePicture = () =>
    {
        this.setState({profilePicture: null});
    }

    handleChange = event =>
    {
        this.setState({auth: event.target.checked});
    };

    handleMenu = event =>
    {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () =>
    {
        this.setState({anchorEl: null});
    };

    render()
    {
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
            <React.Fragment>
                <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                    style={{transform: "scale(1.1)"}}
                >
                    <Avatar src={this.state.profilePicture} style={{margin: '0px'}}>
                        <AccountCircle />
                    </Avatar>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    style={{marginTop: "40px"}}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={() => {this.props.history.replace('/profile/' + this.props.user_id); this.handleClose()}}>My Profile</MenuItem>
                    <MenuItem onClick={() => {this.props.history.replace('/settings'); this.handleClose()}}>User Settings</MenuItem>
                    <MenuItem onClick={() => {this.props.userButton(); this.handleClose()}}>Logout</MenuItem>
                </Menu>
            </React.Fragment>
        );
    }
}

ProfileMenuItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileMenuItem);