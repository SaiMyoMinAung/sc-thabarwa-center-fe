import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from './context/GlobalState';

const drawerWidth = 240;

const navItems = [
    {
        name: 'home',
        url: '/'
    },
    {
        name: 'about',
        url: '/about'
    },
    {
        name: 'contact',
        url: '/contact'
    }
];

function DrawerAppBar(props) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { access_token, delToken } = React.useContext(GlobalContext)

    const handleLangChange = (e) => {
        const lng = e.target.value;
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    const handleLogOut = () => {
        delToken()
        navigate('/')
    }

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                {t('menu_title')}
            </Typography>
            <Divider />
            <List key={1}>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding >
                        <ListItemButton component={Link} to={item.url} sx={{ textAlign: 'center' }}>
                            <ListItemText primary={t(item.name)} />
                        </ListItemButton>
                    </ListItem>
                ))}
                {
                    access_token ?
                        <>
                            <ListItem key='Manager View' disablePadding >
                                <ListItemButton component={Link} to='/manager-view' sx={{ textAlign: 'center' }}>
                                    <ListItemText primary={t('Manager View')} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem key='Log Out' disablePadding >
                                <ListItemButton onClick={() => handleLogOut()} component={Link} to='/manager-view' sx={{ textAlign: 'center' }}>
                                    <ListItemText primary='Log Out' />
                                </ListItemButton>
                            </ListItem>
                        </>
                        :
                        <ListItem key='Login View' disablePadding >
                            <ListItemButton onClick={() => handleLogOut()} component={Link} to='/manager-login' sx={{ textAlign: 'center' }}>
                                <ListItemText primary='Login' />
                            </ListItemButton>
                        </ListItem>
                }
            </List>
        </Box >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        {t('menu_title')}
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Link key={item.name} to={item.url}>
                                <Button key={item.name} sx={{ color: '#fff' }}>
                                    {t(item.name)}
                                </Button>
                            </Link>
                        ))}

                        {
                            access_token ?
                                <>
                                    <Link key='Manager View' to='/manager-view'>
                                        <Button key='Manager View' sx={{ color: '#fff' }}>
                                            {t('Manager View')}
                                        </Button>
                                    </Link>
                                    <Button onClick={() => handleLogOut()} key='Log Out' sx={{ color: '#fff' }}>
                                        Log Out
                                    </Button>
                                </>
                                :
                                <Link key='Login View' to='/manager-login'>
                                    <Button key='Login View' sx={{ color: '#fff' }}>
                                        Login
                                    </Button>
                                </Link>
                        }
                        {/* language selector */}
                        <Select
                            value={i18n.language || 'en'}
                            onChange={handleLangChange}
                            size="small"
                            sx={{ ml: 1, color: '#fff', '.MuiSelect-icon': { color: '#fff' } }}
                        >
                            <MenuItem value="en">{t('EN')}</MenuItem>
                            <MenuItem value="my">{t('MY')}</MenuItem>
                        </Select>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                    {/* also show language selector inside the Drawer for mobile */}
                    <Box sx={{ px: 2, py: 1 }}>
                        <Select
                            value={i18n.language || 'en'}
                            onChange={handleLangChange}
                            fullWidth
                            size="small"
                        >
                            <MenuItem value="en">{t('EN')}</MenuItem>
                            <MenuItem value="my">{t('MY')}</MenuItem>
                        </Select>
                    </Box>
                </Drawer>
            </nav>
            <Box component="main" sx={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Toolbar />
                {props.children}
            </Box>
        </Box>
    );
}


DrawerAppBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DrawerAppBar
