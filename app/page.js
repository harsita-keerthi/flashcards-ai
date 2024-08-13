'use client';

import Image from 'next/image';
import getStripe from '@/utils/get-stripe';
import { AppBar, Toolbar, Typography, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button, Container } from '@mui/material';
import Head from 'next/head';

export default function Home() {
	<Container maxWidth='lg'>
		<Head>
			<title>Flashcard SaaS</title>
			<meta name='description' content='Create flashcard from your text' />
		</Head>

		<AppBar position='static'>
			<Toolbar>
				<Typography variant='h6' stype={{ flexGrow: 1 }}>
					{' '}
					Flashcard SaaS
				</Typography>
				<SignedOut>
					<Button>Login</Button>
					<Button>Sign Up</Button>
				</SignedOut>

				<SignedIn>
					<UserButton />
				</SignedIn>
			</Toolbar>
		</AppBar>
	</Container>;
}
