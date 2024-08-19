"use client";

import Image from 'next/image';
import getStripe from '@/utils/get-stripe';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AppBar, Button, Container, Toolbar, Typography, Box, Grid } from '@mui/material';
import Head from 'next/head';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Footer from './footer';
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';


export default function Home() {
	const router = useRouter();
    const { isSignedIn } = useAuth();
    const { user } = useUser();

    const handleGetStarted = () => {
        if (isSignedIn) {
            // User is signed in, redirect to /generate
            router.push('/generate');
        } else {
            // User is not signed in, redirect to /sign-in
            router.push('/sign-in');
        }
    };

	const handleGoCards = () => {
        if (isSignedIn) {
            // User is signed in, redirect to /generate
            router.push('/flashcards');
        } else {
            // User is not signed in, redirect to /sign-in
            router.push('/sign-in');
        }
    };

	const handleSubmit = async () => {
		const checkoutSession = await fetch('/api/checkout_sessions', {
		  method: 'POST',
		  headers: { origin: 'http://localhost:3000' },
		})
		const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

	if (error) {
		console.warn(error.message);
	  }
	};
			

	return (
		<Container maxWidth="100vw"
		sx={{
			backgroundImage: "url(/background.png)",
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			minHeight: "100vh",
			paddingBottom: 4
		}}>
		

		<AppBar position='static' 
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
				
				<SignedOut>
					<Button color='inherit' sx={{ borderRadius: '20px', padding: '6px 24px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', mr: 2, backgroundColor: '#A6B37D', color: 'white' }} href='/sign-in'>
						Login
					</Button>
					<Button color='inherit' sx={{ borderRadius: '20px', padding: '6px 18px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#A6B37D', color: 'white' }} href='/sign-up'>
						Sign Up
					</Button>
				</SignedOut>

				<SignedIn>
					<UserButton />
				</SignedIn>
			</Toolbar>
		</AppBar>

		<Box sx={{ textAlign: 'center', mt: 8, mx: 'auto', py: 8, px: 3, maxWidth: '900px', borderRadius: 4, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
			<Typography variant='h2' sx={{ fontWeight: 'bold', color: '#00796b', mb: 2 }}>
				Welcome to MemoAI
			</Typography>

			<Typography variant='h6' sx={{ lineHeight: '1.8', color: '#004d40', mb: 4 }}>
				The easiest way to make flashcards from your text
			</Typography>

			<Box sx={{ display: 'inline-flex', gap: 2 }}>
				<Button 
					variant='contained' 
					sx={{ 
						borderRadius: '24px', 
						boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', 
						px: 4, 
						py: 1.5,
						backgroundColor: '#007aff',
						color: '#fff',
						textTransform: 'none',
						background: 'linear-gradient(90deg, rgba(0, 87, 174, 1) 0%, rgba(0, 152, 255, 1) 100%)',
						transition: 'transform 0.3s ease, box-shadow 0.3s ease',
						'&:hover': {
							transform: 'translateY(-2px)',
							boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.3)',
						}
					}}
					onClick={handleGetStarted}
				>
					Get Started
				</Button>

				<Button
					variant='outlined'
					sx={{
						borderRadius: '24px',
						boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', 
						px: 4,
						py: 1.5,
						color: '#007aff',
						textTransform: 'none',
						borderColor: '#007aff',
						transition: 'transform 0.3s ease, box-shadow 0.3s ease',
						'&:hover': {
							transform: 'translateY(-2px)',
							boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.3)',
						}
					}}
					onClick={handleGoCards}
					>
					Saved Cards
				</Button>
			</Box>
		</Box>


		<Box sx={{ my: 6, textAlign: "center", px: 2, mt: 4 }}>
			<Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#00796b" }}>
				Features
			</Typography>

			<Grid container spacing={4} sx={{ justifyContent: "center" }}>

				<Grid item xs={12} md={4}>
					<Box
					sx={{
						mt: 2,
						p: 3,
						borderRadius: 1,
						boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
						backgroundColor: "#fff59d",
						transform: "rotate(-2deg)",
						borderTopLeftRadius: "25px",
						borderTopRightRadius: "5px",
						borderBottomLeftRadius: "5px",
						borderBottomRightRadius: "25px",
						position: "relative",
						"&:after": {
						content: '""',
						position: "absolute",
						top: "10px",
						left: "10px",
						width: "15px",
						height: "15px",
						backgroundColor: "#ff5252",
						borderRadius: "50%",
						boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
						},
					}}
					>
						<Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#004d40" }}>
							Easy Text Input
						</Typography>

						<Typography color="textSecondary">
							Simply input your text and let our software do the rest.
							Creating flashcards has never been easier.
						</Typography>
					</Box>
				</Grid>

				<Grid item xs={12} md={4}>
					<Box
					sx={{
						mt: 2,
						p: 3,
						borderRadius: 1,
						boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
						backgroundColor: "#c5e1a5",
						transform: "rotate(1deg)",
						borderTopLeftRadius: "25px",
						borderTopRightRadius: "5px",
						borderBottomLeftRadius: "5px",
						borderBottomRightRadius: "25px",
						position: "relative",
						"&:after": {
						content: '""',
						position: "absolute",
						top: "10px",
						left: "10px",
						width: "15px",
						height: "15px",
						backgroundColor: "#ff5252",
						borderRadius: "50%",
						boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
						},
					}}
					>
						<Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#004d40" }}>
							Smart Flashcards
						</Typography>

						<Typography color="textSecondary">
							Our AI intelligently breaks down your text into concise
							flashcards, perfect for studying.
						</Typography>
					</Box>
				</Grid>

				<Grid item xs={12} md={4}>
					<Box
					sx={{
						mt: 2,
						p: 3,
						borderRadius: 1,
						boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
						backgroundColor: "#ffcc80",
						transform: "rotate(-1deg)",
						borderTopLeftRadius: "25px",
						borderTopRightRadius: "5px",
						borderBottomLeftRadius: "5px",
						borderBottomRightRadius: "25px",
						position: "relative",
						"&:after": {
						content: '""',
						position: "absolute",
						top: "10px",
						left: "10px",
						width: "15px",
						height: "15px",
						backgroundColor: "#ff5252",
						borderRadius: "50%",
						boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
						},
					}}
					>
						<Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#004d40" }}>
							Accessible Anywhere
						</Typography>

						<Typography color="textSecondary">
							Access your flashcards from any device, at any time. Study on
							the go with ease.
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Box>

		<Box sx={{ my: 6, textAlign: "center", px: 2, mt: 3 }}>
			<Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#00796b" }}>
				Pricing
			</Typography>

			<Grid container spacing={4} justifyContent="center">
				<Grid item xs={12} md={4}>
					<Box
					sx={{
						p: 4,
						mt: 2,
						border: "1px solid",
						borderColor: "grey.300",
						borderRadius: 4,
						backgroundColor: "#f5f5f5",
						boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
						transition: "transform 0.3s ease, box-shadow 0.3s ease",
						"&:hover": {
						transform: "translateY(-8px)",
						boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.1)",
						},
					}}
					>
					<Typography
						variant="h5"
						gutterBottom
						sx={{ fontWeight: "bold", color: "#424242" }}
					>
						Free
					</Typography>
					<Typography
						variant="h6"
						gutterBottom
						sx={{
						color: "#757575",
						fontWeight: "600",
						"-webkit-text-stroke": "1px #5F6F65",
						}}
					>
						$0 / month
					</Typography>
					<Typography color="textSecondary">
						Access to basic flashcard features with ads and limited storage.
					</Typography>
					<Button
						variant="outlined"
						sx={{
						mt: 2,
						borderColor: "#757575",
						color: "#757575",
						textTransform: "none",
						padding: "8px 24px",
						borderRadius: 4,
						}}
						href="/sign-in"
					>
						Get Started
					</Button>
					</Box>
				</Grid>

				<Grid item xs={12} md={4}>
					<Box
					sx={{
						p: 4,
						mt: 2,
						border: "1px solid",
						borderColor: "grey.300",
						borderRadius: 4,
						backgroundColor: "#f5f5f5",
						boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
						transition: "transform 0.3s ease, box-shadow 0.3s ease",
						"&:hover": {
						transform: "translateY(-8px)",
						boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.1)",
						},
					}}
					>
					<Typography
						variant="h5"
						gutterBottom
						sx={{ fontWeight: "bold", color: "#424242" }}
					>
						Basic
					</Typography>
					<Typography
						variant="h6"
						gutterBottom
						sx={{
						color: "#757575",
						fontWeight: "600",
						"-webkit-text-stroke": "1px #5F6F65",
						}}
					>
						$5 / month
					</Typography>
					<Typography color="textSecondary">
						Access to basic flashcard features and limited storage.
					</Typography>
					<Button
						variant="outlined"
						sx={{
						mt: 2,
						borderColor: "#757575",
						color: "#757575",
						textTransform: "none",
						padding: "8px 24px",
						borderRadius: 4,
						}}
						onClick={handleSubmit}
					>
						Choose Basic
					</Button>
					</Box>
				</Grid>

				<Grid item xs={12} md={4}>
					<Box
					sx={{
						p: 4,
						mt: 2,
						border: "1px solid",
						borderColor: "grey.300",
						borderRadius: 4,
						backgroundColor: "#f5f5f5",
						boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
						transition: "transform 0.3s ease, box-shadow 0.3s ease",
						"&:hover": {
						transform: "translateY(-8px)",
						boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.1)",
						},
					}}
					>
					<Typography
						variant="h5"
						gutterBottom
						sx={{ fontWeight: "bold", color: "#424242" }}
					>
						Pro
					</Typography>
					<Typography
						variant="h6"
						gutterBottom
						sx={{
						color: "#757575",
						fontWeight: "600",
						"-webkit-text-stroke": "1px #5F6F65",
						}}
					>
						$10 / month
					</Typography>
					<Typography color="textSecondary">
						Unlimited flashcards and storage, with priority support.
					</Typography>
					<Button
						variant="outlined"
						sx={{
						mt: 2,
						borderColor: "#757575",
						color: "#757575",
						textTransform: "none",
						padding: "8px 24px",
						borderRadius: 4,
						}}
						onClick={handleSubmit}
					>
						Choose Pro
					</Button>
					</Box>
				</Grid>
				</Grid>
			</Box>
			<Footer />
		</Container>
	);
	}
