import React from "react";
import Head from "next/head";
import { Box, Container, TextField, Typography } from "@material-ui/core";

const IndexPage = () => (
  <>
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Head>
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          style={{ width: "263px" }}
        >
          Your To Do List
        </Typography>
        <TextField
          id="filled-basic"
          label="Email"
          placeholder="example@email.com"
          type="email"
          variant="filled"
          fullWidth
        />
      </Box>
    </Container>
  </>
);

export default IndexPage;
