import React from "react";
import Head from "next/head";
import { Box, Container, TextField, Typography, Icon } from "@material-ui/core";
import LogInLogo from "./LogInLogo";

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
          style={{
            width: "263px",
            height: "336px",
            left: "24px",
            top: "30px",
          }}
        >
          Your To Do List
        </Typography>

        <Icon
          style={{
            top: "273px",
            left: "178px",
            width: "285px",
            height: "253px",
            position: "absolute",
          }}
        >
          <LogInLogo />
        </Icon>

        <TextField
          id="filled-basic"
          label="Email"
          placeholder="example@email.com"
          type="email"
          variant="filled"
          fullWidth
          style={{
            position: "absolute",
            left: "6.4%",
            right: "6.13%",
            top: "86.96%",
            bottom: "4.65%",
          }}
        />
      </Box>
    </Container>
  </>
);

export default IndexPage;
