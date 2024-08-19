'use client';

import Image from 'next/image';
import getStripe from '@/utils/get-stripe';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AppBar, Button, Container, Toolbar, Typography, Box, Grid } from '@mui/material';
import Head from 'next/head';

export default function Home() {
	const handleSubmit = async () => {
		const checkoutSession = await fetch('/api/checkout_sessions', {
		  method: 'POST',
		  headers: { origin: 'http://localhost:3000' },
		})
		const checkoutSessionJson = await checkoutSession.json()

		if (checkoutSession.statusCode === 500) {
			console.error(checkoutSession.message)
			return
		}
	  
		const stripe = await getStripe()
		const {error} = await stripe.redirectToCheckout({
		  sessionId: checkoutSessionJson.id,
		})
	  
		if (error) {
		  console.warn(error.message)
		}
	  }

	return (
		<Container maxWidth='100vw'>
			<Head>
				<title>Flashcard SaaS</title>
				<meta name='description' content='Create flashcard from your text' />
			</Head>

			<AppBar 
				position='static' 
				sx={{ 
					width: '100%', 
					background: 'linear-gradient(90deg, rgba(0, 87, 174, 1) 0%, rgba(0, 152, 255, 1) 100%)'
				}}
			>				
				<Toolbar sx={{ px: 2 }}>
				<Typography variant='h6' style={{ flexGrow: 1, fontWeight: 'bold' }}>
					Flashcard SaaS
				</Typography>

				<SignedOut>
					<Button color='inherit' sx={{ borderRadius: '4px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', mr: 2 }} href='/sign-in'>
						Login
					</Button>
					<Button color='inherit' sx={{ borderRadius: '4px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }} href='/sign-up'>
						Sign Up
					</Button>
				</SignedOut>

				<SignedIn>
					<UserButton />
				</SignedIn>
				</Toolbar>
			</AppBar>

			<Box sx={{ textAlign: 'center', my: 2, backgroundColor: '#f5f5f5', py: 7 }}>
				<Typography variant='h2' gutterBottom sx={{ mt: -2, fontWeight: 'bold'}}>
					Welcome to Flashcard SaaS
				</Typography>
				<Typography variant='h5' gutterBottom sx={{ lineHeight: '2.5' }}>
					The easiest way to make flashcards from your text
				</Typography>
				<Button variant='contained' color='primary' sx={{ mt: 4, borderRadius: '24px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', px: 4, py: 1.5 }}
					href="/generate">
					GET STARTED
				</Button>
			</Box>

			<Box sx={{ my: 6, textAlign: 'center', px: 2, mt: 4 }}>
				<Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold' }}>
					Features
				</Typography>
				<Grid container spacing={4} sx={{ justifyContent: 'center' }}>
					<Grid item xs={12} md={4}>
						<Box sx={{ mt: 2, p: 2, borderRadius: 2, boxShadow: 3 }}>
							<Typography variant='h6' gutterBottom>
								Easy Text Input
							</Typography>
							<Typography color='textSecondary'>
								Simply input your text and let our software do the rest. Creating flashcards has never been easier.
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box sx={{ mt: 2, p: 2, borderRadius: 2, boxShadow: 3 }}>
							<Typography variant='h6' gutterBottom>
								Smart Flashcards
							</Typography>
							<Typography color='textSecondary'>
								Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box sx={{ mt: 2, p: 2, borderRadius: 2, boxShadow: 3 }}>
							<Typography variant='h6' gutterBottom>
								Accessible Anywhere
							</Typography>
							<Typography color='textSecondary'>
								Access your flashcards from any device, at any time. Study on the go with ease.
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Box>


			<Box sx={{ my: 6, textAlign: 'center', px: 2, mt: 3  }}>
				<Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold' }}>
					Pricing
				</Typography>

				<Grid container spacing={4} justifyContent="center">
					<Grid item xs={12} md={4}>
						<Box
							sx={{
								p: 4,
								mt: 2,
								border: '1px solid',
								borderColor: 'grey.300',
								borderRadius: 2,
								backgroundColor: 'grey.50',
							}}
						>
							<Typography variant='h5' gutterBottom>
								Free
							</Typography>
							<Typography variant='h6' gutterBottom>
								$0 / month
							</Typography>
							<Typography>Access to basic flashcard features with ads and limited storage.</Typography>
							<Button variant='outlined' color='primary' sx={{ mt: 2 }} href="/generate">
								GET STARTED
							</Button>
						</Box>
					</Grid>

					<Grid item xs={12} md={4}>
						<Box
							sx={{
								p: 4,
								mt: 2,
								border: '2px solid',
								borderColor: 'primary.main',
								borderRadius: 2,
								backgroundColor: 'primary.50',
								boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
							}}
						>
							<Typography variant='h5' gutterBottom>
								Basic
							</Typography>
							<Typography variant='h6' gutterBottom>
								$5 / month
							</Typography>
							<Typography>Access to basic flashcard features and limited storage.</Typography>
							<Button variant='contained' color='primary' sx={{ mt: 2 }} onClick={handleSubmit}>
								CHOOSE BASIC
							</Button>
						</Box>
					</Grid>

					<Grid item xs={12} md={4}>
						<Box
							sx={{
								p: 4,
								mt: 2,
								border: '2px solid',
								borderColor: 'secondary.main',
								borderRadius: 2,
								backgroundColor: 'secondary.50',
								boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
							}}
						>
							<Typography variant='h5' gutterBottom>
								Pro
							</Typography>
							<Typography variant='h6' gutterBottom>
								$10 / month
							</Typography>
							<Typography>Unlimited flashcards and storage, with priority support.</Typography>
							<Button variant='contained' color='secondary' sx={{ mt: 2 }} onClick={handleSubmit}>
								CHOOSE PRO
							</Button>
						</Box>
					</Grid>
				</Grid>

				{/* <Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<Box
							sx={{
								p: 3,
								border: '1px solid',
								borderColor: 'grey.300',
								borderRadius: 2,
							}}
						>
							<Typography variant='h5' gutterBottom>
								Basic
							</Typography>
							<Typography variant='h6' gutterBottom>
								$5 / month
							</Typography>
							<Typography> Access to basic flashcard features and Limited storage.</Typography>
							<Button variant='contained' color='primary' sx={{ mt: 2 }}>
								CHOOSE BASIC
							</Button>
						</Box>
					</Grid>

					<Grid item xs={12} md={6}>
						<Box
							sx={{
								p: 3,
								border: '1px solid',
								borderColor: 'grey.300',
								borderRadius: 2,
							}}
						>
							<Typography variant='h5' gutterBottom>
								Pro
							</Typography>
							<Typography variant='h6' gutterBottom>
								$10 / month
							</Typography>
							<Typography> Unlimited flashcard and storage, with priority support.</Typography>
							<Button variant='contained' color='primary' sx={{ mt: 2 }}>
								CHOOSE PRO
							</Button>
						</Box>
					</Grid>
				</Grid> */}
			</Box>
		</Container>
	);
	}
