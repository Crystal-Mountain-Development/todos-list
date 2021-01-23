import React from "react";
import Head from "next/head";
import { Box, Container, TextField, Typography, Icon } from "@material-ui/core";
import LogInLogo from "../components/LogInLogo";

const IndexPage = () => (
  <>
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Head>
    <Container maxWidth="xs">
      <Box 
      display="flex"
      position="relative"
      flexDirection="column"
      justifyContent="space-between"
      height="100vh"
      py={3}
      >
        <Typography
           variant="h1"
           component="h1"
           gutterBottom
           style={{
             width: "263px",
             height: "336px",
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
          <LogInLogo style={{ position: "fixed" }}/>
        </Icon>

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
