"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import {
  Container,
  CardActionArea,
  CardContent,
  Typography,
  Card,
  Grid,
  Box,
  AppBar,
  Toolbar,
  Button,
  Dialog,
  IconButton,
  DialogActions, 
  DialogTitle, 
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Head from "next/head";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the arrow icon
import Link from "next/link";
import Footer from '../footer';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  const handleDelete = async (name) => {
    if (!user) return;

    // Remove the flashcard from the state
    const updatedFlashcards = flashcards.filter(flashcard => flashcard.name !== name);
    setFlashcards(updatedFlashcards);

    // Update the flashcards in the Firestore document
    const docRef = doc(collection(db, "users"), user.id);
    await updateDoc(docRef, {
      flashcards: updatedFlashcards
    });
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

      <Box
        sx={{
          textAlign: "center",
          mt: 10,
          mx: "auto",
          py: 4,
          px: 3,
          maxWidth: "900px",
          borderRadius: 4,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#00796b", mb: 7 }}
        >
          Your Saved Memos
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#004d40",
                        textAlign: "center", 
                      }}
                    >
                      {flashcard.name}
                    </Typography>

                    <IconButton 
                      aria-label="delete" 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering the CardActionArea click
                        handleDelete(flashcard.name);
                      }}  
                      sx={{ color: '#FAA0A0' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </CardActionArea>
              
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </Container>
  );
}

