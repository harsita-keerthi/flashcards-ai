import { SignUp } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Button, Typography, Box } from "@mui/material";
import Link from "next/link";

export default function SignUpPage() {
    return <Container maxWidth="100vw">
        <AppBar 
				position='static' 
				sx={{ 
					width: '100%', 
					background: 'linear-gradient(90deg, rgba(0, 87, 174, 1) 0%, rgba(0, 152, 255, 1) 100%)'
				}}
			>	
            <Toolbar>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        flexGrow: 1 
                    }}
                >
                    Flashcard SaaS
                </Typography>
                <Button color='inherit' sx={{ borderRadius: '4px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', mr: 2 }}>
                    <Link href={"/sign-in"} passHref>
                        Login
                    </Link>
                </Button>

                <Button color='inherit' sx={{ borderRadius: '4px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'}}>
                    <Link href={"/sign-up"} passHref>
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
            <Typography variant="h4" sx={{mt: 4, mb: 3}}>
                Sign Up
            </Typography>
            <SignUp />
        </Box>
    </Container>}