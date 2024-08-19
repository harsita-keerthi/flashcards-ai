import { SignUp } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Button, Typography, Box } from "@mui/material";
import Link from "next/link";
import Footer from '../../footer';
import HomeIcon from '@mui/icons-material/Home';


export default function SignUpPage() {
    return <Container maxWidth="100vw"
        sx={{ 
            backgroundImage: 'url(/background.png)', 
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '100vh', paddingBottom: 4 
        }}>
        <AppBar 
                position='static' 
                sx={{ 
                    width: '100%', 
                    background: '#5F6F65',
                    borderRadius: '0 0 16px 16px'
                }}
            >	
            <Toolbar sx={{ px: 2 }}>
                <Link href="/" passHref style={{ color: 'white', textDecoration: 'none' }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                        <HomeIcon sx={{ color: 'inherit' }} />
                        <Typography variant='h6' style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}>
                            MemoAI
                        </Typography>
                    </Box>
                </Link>

                <Box sx={{ flexGrow: 1 }} />

                <Button 
                    color='inherit' 
                    sx={{ 
                        borderRadius: '20px', 
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                        mr: 2, 
                        backgroundColor: '#A6B37D', 
                        color: 'white' 
                    }}
                >
                    <Link href="/sign-in" passHref style={{ color: 'white', textDecoration: 'none', padding: '0px 16px' }}>
                        Login
                    </Link>
                </Button>

                <Button 
                    color='inherit' 
                    sx={{ 
                        borderRadius: '20px', 
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                        backgroundColor: '#A6B37D', 
                        color: 'white' 
                    }}
                >
                    <Link href="/sign-up" passHref style={{ color: 'white', textDecoration: 'none', padding: '0px 10px' }}>
                        Sign Up
                    </Link>
                </Button>
            </Toolbar>
        </AppBar>

        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Typography variant="h4" sx={{mt: 4, mb: 3, fontWeight: 'bold', color: '#00796b'}}>
                Sign Up 
            </Typography>
            <SignUp />
        </Box>
        <Footer />
    </Container>
    }