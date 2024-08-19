import { SignIn } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Button, Typography, Box } from "@mui/material";
import Link from "next/link";

export default function SignUpPage() {
    return <Container maxWidth='100vw' 
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
                <Typography 
                    variant="h6" 
                    sx={{ 
                        flexGrow: 1, 
                        fontWeight: 'bold', 
                        fontFamily: 'Comic Sans MS, sans-serif'
                    }}
                >
                    MemoAI
                </Typography>

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
                    <Link href="/sign-in" passHref style={{ color: 'white', textDecoration: 'none' }}>
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
                    <Link href="/sign-up" passHref style={{ color: 'white', textDecoration: 'none' }}>
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
                Sign In
            </Typography>
            <SignIn />
        </Box>
    </Container>}