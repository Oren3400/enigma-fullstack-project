import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function UserForm({ userData = { name: '', email: '' }, isNewUser = true, onSubmitHandler }) {
    const classes = useStyles();

    const [user, setUser] = useState(userData);

    function handleChange(event) {
        const { name: key, value } = event.target;
        switch (key) {
            case 'name':
                setUser((user) => ({ ...user, name: value }));
                break;
            case 'email':
                setUser((user) => ({ ...user, email: value }));
                break;
            default:
                console.warn(`Try to update changes for unknown key: ${key}`);
        }
    }

    function onSubmit(event) {
        event.preventDefault();
        onSubmitHandler(user);
    }

    useEffect(() => {
        setUser(userData);
    }, [userData]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>{isNewUser ? <PersonAddIcon /> : <EditIcon />}</Avatar>
                <Typography component="h1" variant="h5">
                    {isNewUser ? 'New User' : 'Edit User'}
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        label="Name"
                        type="text"
                        id="name"
                        onChange={handleChange}
                        value={user.name}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={handleChange}
                        value={user.email}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isNewUser ? 'Create User' : 'Save Changes'}
                    </Button>
                </form>
            </div>
        </Container>
    );
}
