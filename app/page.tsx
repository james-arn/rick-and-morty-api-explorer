import { Container, Box, Typography, Link } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={2}
      >
        <Link href="/characters" underline="none">
          <Typography variant="h6" component="span">Characters</Typography>
        </Link>
        <Link href="/episodes" underline="none">
          <Typography variant="h6" component="span">Episodes</Typography>
        </Link>
        <Link href="/locations" underline="none">
          <Typography variant="h6" component="span">Locations</Typography>
        </Link>
      </Box>
    </Container>
  );
}