'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import getStripe from "../../utils/get-stripe"
import { useSearchParams } from "next/navigation"
import { Box, CircularProgress, Container, Typography } from "@mui/material"

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) return

            try{
                const res = await fetch(`/api/checkout_sessions?session_id=${session_id}`)
                const sessionData = await res.json()
                if (res.ok) {
                    setSession(sessionData)
                } else {
                    setError(sessionData.error)
                }
            }
            catch (err) {
                setError('An error occured!')
            } finally {
                setLoading(false)
            }
        }
        fetchCheckoutSession()
    }, [session_id])

    if (loading) {
        return(
            <Container 
                maxWidth="100vw"
                sx={{ 
                    display: 'flex', // Enable flexbox
                    flexDirection: 'column', // Stack items vertically
                    justifyContent: 'center', // Center items vertically
                    alignItems: 'center', // Center items horizontally
                    textAlign: 'center',
                    backgroundImage: 'url(/background.png)', 
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    paddingBottom: 4 
                }}
            >
                <CircularProgress />
                <Typography variant="h6" sx={{ mt: 5, fontSize: '1.5rem' }}> 
                    Loading... 
                </Typography>
            </Container>
        )
    }

    if (error) {
        return (
            <Container maxWidth="100vw"
            sx={{ 
                textAlign: 'center',
                mt: 10,
                backgroundImage: 'url(/background.png)', 
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: '100vh', paddingBottom: 4 
            }}
            >
                <Typography variant="h6"> {error} </Typography>
            </Container>
        )
    }
    return (
        <Container maxWidth="100vw"
            sx={{ 
                textAlign: 'center',
                backgroundImage: 'url(/background.png)', 
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: '100vh', paddingBottom: 4 
            }}
            >
                {session.payment_status === "paid" ? (
                    <Box
                    sx={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        minHeight: '100vh', // Full height of the viewport
                        textAlign: 'center', // Center text alignment
                    }}>
                        <img 
                            src="/images/happy.png" 
                            style={{
                                width: '100px', 
                                marginBottom: '30px', 
                            }}
                        />
                        <Typography variant="h4" sx={{fontWeight: 'bold'}}> Payment Successful! </Typography>
                        <Box sx={{mt:22}}>
                            <Typography variant="h6"> Session ID: {session_id} </Typography>
                            <Typography variant="body1"> 
                                We have received your payment. You will receive an email with the order details shortly.  
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <>
                    <Box 
                        sx={{
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            minHeight: '100vh', // Full height of the viewport
                            textAlign: 'center', // Center text alignment
                        }}
                    >
                        <img 
                            src="/images/sad.png" 
                            style={{
                                width: '100px', // Adjust the width as needed
                                marginBottom: '30px', // Space between the image and the text
                            }}
                        />
                        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', }}>
                            Payment Failed!
                        </Typography>
                        <Typography variant="body1">
                            Your payment was not successful. Please try again.
                        </Typography>
                    </Box>
                    </>
                )}
            </Container>
        )
}

export default ResultPage
