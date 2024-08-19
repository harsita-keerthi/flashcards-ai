"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import {
  Container,
  Card,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CardContent,
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Toolbar,
  AppBar,
} from "@mui/material";
import Head from "next/head";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import Flashcards from "../flashcards/page";
import Footer from '../footer';
import HomeIcon from '@mui/icons-material/Home';


export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;
      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = [];

      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [user, search]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

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

      {/* Back to flashcards button */}
      <Box sx={{ mt: 2, ml: 2 }}>
        <Link href="/flashcards" passHref>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{
              mt: 2,
              ml: -2,
              backgroundColor: '#808D7C', // Primary color
              color: '#ffffff', // White text color
              borderRadius: '15px', // Rounded corners
              padding: '12px 24px', // Padding for a better look
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
            Back to Saved Cards
          </Button>
        </Link>
      </Box>

      <Grid
        container
        spacing={3}
        sx={{ mt: 4, justifyContent: "center", px: 2 }}
      >
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
              }}>

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
      <Footer />
    </Container>
  );
}
