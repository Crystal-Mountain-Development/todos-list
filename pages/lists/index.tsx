import React, { useCallback, useRef, useState } from "react";
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
  Divider,
  AppBar,
  Portal,
} from "@material-ui/core";
import { useRouter } from "next/router";

import ListsLogo from "../../components/ListsLogo";
import SeachIcon from "../../components/SeachIcon";
import MenuIcon from "../../components/MenuIcon";
import AddIcon from "../../components/AddIcon";
import ListIcon from "../../components/ListIcon";
import { GetServerSideProps } from "next";
import { useMyListQuery } from "../../generated/graphql";
import { getServerPageMyList } from "../../generated/nextSSR";
import { initializeApollo } from "../../apollo/client";

const IndexPage = () => {
  const { data } = useMyListQuery();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const appBarPortalContainer = useRef(null);

  const onClickMenuOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);
  const onClickMenuClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  /*
    problem: if someone don't have list, they don't enter in the map
    solutions? : fill with dummy data the first entry, [0], that allow to use .map
    where? : in api (preferably), if not in list
  */
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
          pt={3}
        >
          <Box>
            <Button onClick={() => router.push("/")}>{"< Back"}</Button>
          </Box>

          <Box display="flex" flexDirection="column" flex="1 1 auto" pb="75px">
            {!data?.lists.length && (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gridRowGap="25px"
                m="auto"
              >
                <ListsLogo />
                <Typography variant="h5" component="h5" align="center">
                  No list found
                </Typography>
              </Box>
            )}
            {data?.lists.map(({ title, isComplete, id }) => (
              <Box key={id}>
                <Box height="75px" display="flex">
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    flex="1 1 auto"
                  >
                    <Typography variant="subtitle1">{title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {isComplete ? "Complete" : "Incomplete"}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <ListIcon />
                  </Box>
                </Box>
                <Divider />
              </Box>
            ))}
          </Box>
          <Portal container={appBarPortalContainer.current}>
            <AppBar
              component="div"
              position="fixed"
              style={{ top: "auto", bottom: 0 }}
            >
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
            </AppBar>
          </Portal>
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
      </Container>
      <div id="app-bar" ref={appBarPortalContainer} />
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
