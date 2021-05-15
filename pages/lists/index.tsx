import React, { useCallback, useState } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Typography,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Drawer,
  List,
  ListItem,
} from "@material-ui/core";
import { useRouter } from "next/router";

import ListsLogo from "../../components/ListsLogo";
import SeachIcon from "../../components/SeachIcon";
import MenuIcon from "../../components/MenuIcon";
import AddIcon from "../../components/AddIcon";
import { GetServerSideProps } from "next";
import { useMyListQuery } from "../../generated/graphql";
import { getServerPageMyList } from "../../generated/nextSSR";
import { initializeApollo } from "../../apollo/client";

const IndexPage = () => {
  const { data } = useMyListQuery();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const onClickMenuOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);
  const onClickMenuClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Container maxWidth="xs">
        <Box
          position="relative"
          display="flex"
          flexDirection="column"
          height="100vh"
          py={3}
        >
          <Box>
            <Button onClick={() => router.push("/")}>{"< Back"}</Button>
          </Box>

          <Box margin="auto">
            <ListsLogo />
            <Typography variant="h5" component="h5" align="center">
              No list found
            </Typography>
          </Box>

          <Box>
            <BottomNavigation>
              <BottomNavigationAction
                label="seach"
                value="Seach"
                icon={<SeachIcon />}
                onClick={onClickMenuOpen}
              />
              <Fab color="primary">
                <AddIcon />
              </Fab>
              <BottomNavigationAction
                label="menu"
                value="Menu"
                icon={<MenuIcon />}
              />
            </BottomNavigation>
            <Drawer
              open={drawerOpen}
              onClose={onClickMenuClose}
              anchor={"bottom"}
            >
              <Typography variant="h6" component="h6">
                exampleUser
              </Typography>
              <Typography variant="subtitle1">User</Typography>
              <List>
                <ListItem>Close session</ListItem>
                <ListItem>Close application</ListItem>
              </List>
            </Drawer>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo({
    headers: context.req.headers as Record<string, string>,
  });

  return getServerPageMyList({}, apolloClient);
};

export default IndexPage;
