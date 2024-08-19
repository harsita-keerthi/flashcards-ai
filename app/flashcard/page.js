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
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the arrow icon
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { useSearchParams } from "next/navigation";
import Flashcards from "../flashcards/page";

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
    <Container
      maxWidth="100vw"
      sx={{
        background: "#ffffff",
        minHeight: "100vh",
        paddingBottom: 4,
        paddingTop: 0,
      }}
    >
      <Head>
        <title>MemoAI</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>

      <AppBar
        position="static"
        sx={{
          width: "100%",
          background: "#5F6F65",
          borderRadius: "0 0 16px 16px",
        }}
      >
        <Toolbar sx={{ px: 2 }}>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              fontWeight: "bold",
              fontFamily: "Comic Sans MS, sans-serif",
            }}
          >
            MemoAI
          </Typography>

          <SignedOut>
            <Button
              color="inherit"
              sx={{
                borderRadius: "20px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                mr: 2,
                backgroundColor: "#A6B37D",
                color: "white",
              }}
              href="/sign-in"
            >
              Login
            </Button>
            <Button
              color="inherit"
              sx={{
                borderRadius: "20px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#A6B37D",
                color: "white",
              }}
              href="/sign-up"
            >
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
              paddingRight: "15px",
              paddingLeft: "15px",
              backgroundColor: "#A6B37D",
              color: "white",
              borderRadius: "20px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#8C9E70",
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
            <Card>
              <CardActionArea
                onClick={() => {
                  handleCardClick(index);
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      perspective: "1000px",
                      "& > div": {
                        transition: "transform 0.6s",
                        transformStyle: "preserve-3d",
                        position: "relative",
                        width: "100%",
                        height: "200px",
                        boxShadow: "0 4px 8px 0 rgba(0,0,0, 0.2)",
                        transform: flipped[index]
                          ? "rotateY(180deg)"
                          : "rotateY(0deg)",
                      },
                      "& > div > div": {
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 2,
                        boxSizing: "border-box",
                      },
                      "& > div > div:nth-of-type(2)": {
                        transform: "rotateY(180deg)",
                      },
                    }}
                  >
                    <div>
                      <div>
                        <Typography variant="h6" component="div">
                          {flashcard.front}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="h6"
                          sx={{ margin: 2 }}
                          component="div"
                        >
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
    </Container>
  );
}
