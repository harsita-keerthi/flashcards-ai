
'use client'

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"
import { db } from "@/firebase"
import { Container, Card, CardActionArea, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, CardContent, Grid, Box, Typography, Paper, TextField, Button, AppBar, Toolbar, IconButton, ArrowBackIcon } from "@mui/material"
import { writeBatch, getDoc, collection, doc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Footer from '../footer';
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';


export default function Generate() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()


    const handleSubmit = () => {
        fetch('/api/generate', {
            method: 'POST',
            body: text, 
        })
        .then((res) => res.json())
        .then((data) => setFlashcards(data))
    };
    

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)

    }

    const saveFlashcards = async () => {
        if(!name) {
            alert('Please enter a name for your deck')
            return
        }

        const batch = writeBatch(db)
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            if (collections.find((f) => f.name === name)) {
                alert('Flashcard collection with the same name already exists.')
                return
            }
            else {
                collections.push({name})
                batch.set(userDocRef, {flashcards: collections}, {merge: true})
            }
        }
        else {
            batch.set(userDocRef, {flashcards: [{name}]})
        }

        const colRef = collection(userDocRef, name)
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })

        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }

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
                    <Link href="/" passHref style={{ color: 'white', textDecoration: 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                            <img src="/images/home.png" style={{ width: '24px', height: '24px' }} />
                            <Typography variant='h6' style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}>
                                MemoAI
                            </Typography>
					    </Box>
                    </Link>

                    <Box sx={{ flexGrow: 1 }} />
                    
                    <SignedOut>
						<Button color='inherit' sx={{ borderRadius: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', mr: 2, backgroundColor: '#A6B37D', color: 'white' }} href='/sign-in'>
							Login
						</Button>
						<Button color='inherit' sx={{ borderRadius: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#A6B37D', color: 'white' }} href='/sign-up'>
							Sign Up
						</Button>
					</SignedOut>

					<SignedIn>
						<UserButton />
					</SignedIn>
                </Toolbar>
			</AppBar>

            <Box sx={{ mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#00796b', mt: 2, mb: 3 }}>
                Generate Flashcards
                </Typography>
                <Paper sx={{ 
                    p: 4, 
                    width: '80%', 
                    height: '300px', 
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
                    borderRadius: '16px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background
                }}>
                    <TextField 
                        value={text} 
                        onChange={(e) => setText(e.target.value)} 
                        label="Enter text"
                        fullWidth
                        multiline
                        rows={5}
                        variant="outlined"
                        sx={{
                            mb: 3,
                            mt: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                backgroundColor: 'rgba(255, 255, 255, 0.6)', // Slightly more opaque input background
                            },
                            '& .MuiInputLabel-root': {
                                fontWeight: 'bold',
                                color: '#00796b',
                            },
                        }}
                    />
                    <Button 
                        variant="contained" 
                        sx={{ 
                            borderRadius: '24px', 
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', 
                            fontSize: '1rem',
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
                        onClick={handleSubmit} 
                    >
                        Submit
                    </Button>
                </Paper>
            </Box>
            {flashcards.length > 0 && (
                <Box sx={{mt:4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#00796b', mt: 2, mb: 4}}>
                        Flashcards Preview
                    </Typography>
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card 
                                sx={{
                                    background: 'linear-gradient(90deg, rgba(156, 169, 134, 0.4) 0%, rgba(129, 145, 107, 0.6) 100%)',
                                    borderRadius: '16px', 
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.2)',
                                    }
                                }}
                            >
                                <CardActionArea onClick={() => handleCardClick(index)}>
                                    <CardContent>
                                        <Box 
                                            sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                                                    borderRadius: '16px',
                                                    backgroundColor: flipped[index] 
                                                        ? 'linear-gradient(135deg, rgba(166, 179, 125, 0.4) 0%, rgba(204, 213, 174, 0.4) 100%)' // Gradient for the flipped side
                                                        : 'linear-gradient(135deg, rgba(204, 213, 174, 0.4) 0%, rgba(166, 179, 125, 0.4) 100%)', // Gradient for the normal side
                                                    transform: flipped[index]
                                                        ? 'rotateY(180deg)'
                                                        : 'rotateY(0deg)',
                                                },
                                                '& > div > div': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box',
                                                    borderRadius: '16px',
                                                    fontFamily: 'Comic Sans MS, sans-serif',
                                                    textAlign: 'center',
                                                    color: '#4a4a4a',
                                                },
                                                '& > div > div:nth-of-type(2)':{
                                                    transform: 'rotateY(180deg)',
                                                    background: 'linear-gradient(135deg, rgba(231, 232, 216, 0.3) 0%, rgba(200, 200, 180, 0.3) 100%)',
                                                },
                                            }}
                                        >
                                                <div>
                                                    <div>
                                                        <Typography variant="h5" component="div" sx={{ 
                                                            fontWeight: 'bold', 
                                                            fontSize: '1.2rem', // Adjusting the font size
                                                            lineHeight: '1.2', // Tightening the line height for better readability
                                                            padding: '0 8px', // Adding some padding to the text
                                                        }}>
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5" component="div" 
                                                        sx={{ 
                                                            margin:2,
                                                            fontSize: '1.2rem', // Slightly smaller font size for answers
                                                            lineHeight: '1.3', // Adjusting line height for readability
                                                            padding: '0 8px', // Adding padding for a better look
                                                        }}>
                                                            {flashcard.back}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{mt: 4, display: 'flex', justifyContent:'center'}}>
                        <Button variant='contained' color='secondary' onClick={handleOpen}
                        sx={{ 
                            borderRadius: '24px', 
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', 
                            fontSize: '1rem',
                            px: 5, 
                            py: 1.5,
                            mt: 5,
                            backgroundColor: '#007aff',
                            color: '#fff',
                            textTransform: 'none',
                            background: 'linear-gradient(90deg, rgba(0, 87, 174, 1) 0%, rgba(0, 152, 255, 1) 100%)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.3)',
                            }
                        }}>
                            Save
                        </Button>
                    </Box>
                </Box>
            )}

            <Dialog open={open} onClose={handleClose}>
            <DialogTitle 
                sx={{ 
                    fontWeight: 'bold', 
                    color: '#004d40',
                    textAlign: 'center',
                }}
            >
                Save Flashcards
            </DialogTitle>
            <DialogContent sx={{ px: 4, py: 3 }}>
                <DialogContentText 
                    sx={{ 
                        color: '#555', 
                        mb: 2, 
                        fontFamily: 'Comic Sans MS, sans-serif', 
                        textAlign: 'center',
                    }}
                >
                    Please enter a name for your flashcards collection.
                </DialogContentText>
                <TextField 
                    autoFocus 
                    margin='dense' 
                    label='Collection Name'
                    type='text'
                    fullWidth 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant='outlined'
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: '#f0f4c3', // Light pastel background
                        },
                        '& .MuiInputLabel-root': {
                            fontWeight: 'bold',
                            color: '#5F6F65',
                        },
                        '& .MuiInputBase-input': {
                            fontFamily: 'sans-serif',
                        },
                    }}
                />
            </DialogContent>
                
            <DialogActions>
                <Button onClick={handleClose}
                sx={{
                    mb: 2,
                    backgroundColor: '#5F6F65', // Primary color
                    color: '#ffffff', // White text color
                    borderRadius: '15px', // Rounded corners
                    padding: '8px 20px', // Padding for a better look
                    fontWeight: 'bold', // Bold text
                    textTransform: 'none', // No uppercase transformation
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Shadow for depth
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transitions
                    '&:hover': {
                        backgroundColor: '#004d40', // Darker shade on hover
                        transform: 'translateY(-2px)', // Slight lift on hover
                        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.3)', // Enhanced shadow on hover
                    },
                }}>
                    Cancel
                </Button>
                <Button 
                    onClick={saveFlashcards}
                    sx={{
                        mb: 2,
                        mr: 2,
                        backgroundColor: '#5F6F65', // Primary color
                        color: '#ffffff', // White text color
                        borderRadius: '15px', // Rounded corners
                        padding: '8px 24px', // Padding for a better look
                        fontWeight: 'bold', // Bold text
                        textTransform: 'none', // No uppercase transformation
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Shadow for depth
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transitions
                        '&:hover': {
                            backgroundColor: '#004d40', // Darker shade on hover
                            transform: 'translateY(-2px)', // Slight lift on hover
                            boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.3)', // Enhanced shadow on hover
                        },
                    }}
                >
                    Save
                </Button> 
            </DialogActions>
        </Dialog>
        <Footer />
    </Container>
}