import { Box, Container, Typography, Link } from '@mui/material';

function Footer() {
    return (
        <Box 
            component="footer" 
            sx={{
                color: '#004d40', // White text color
                py: 3, // Padding on top and bottom
                mt: 4, // Margin on top to separate from content
                textAlign: 'center', // Centered text
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body1" sx={{ mb: 1 }}>
                    © {new Date().getFullYear()} MemoAI. All rights reserved.
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Built with ❤️ by the MemoAI Team
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
