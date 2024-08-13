import Image from 'next/image';
import getStripe from '@/utils/get-stripe';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AppBar, Button, Container, Toolbar, Typography, Box } from '@mui/material';
import Head from 'next/head';

export default function Home() {
	<Container maxWidth='100v'>
		<Head>
			<title>Flashcard SaaS</title>
			<meta name='description' content='Create flashcard from your text' />
		</Head>

		<AppBar position='static'>
			<Toolbar>
				<Typography variant='h6' stype={{ flexGrow: 1 }}>
					Flashcard SaaS
				</Typography>
				<SignedOut>
					<Button color='inherit'>Login</Button>
					<Button color='inherit'>Sign Up</Button>
				</SignedOut>

				<SignedIn>
					<UserButton />
				</SignedIn>
			</Toolbar>
		</AppBar>
		<Box>
			<Typography variant='h2'> Welcome to Flashcard SaaS</Typography>
			<Typography variant='h5'> The easist way to make flashcards from your text</Typography>
			<Button variant='contained' color='primary' sx={{ mt: 2 }}>
				GET STARTED
			</Button>
		</Box>
	</Container>;
}
