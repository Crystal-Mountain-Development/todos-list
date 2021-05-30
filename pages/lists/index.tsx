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
  Divider,
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
  console.log("🚀 ~ file: index.tsx ~ line 30 ~ IndexPage ~ data :=", data?.lists)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

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
          py={3}
        >
          <Box>
            <Button onClick={() => router.push("/")}>{"< Back"}</Button>
          </Box>

          <Box marginBottom="auto">

            {data?.lists.map((x, i) => {
              if (i === 0) {
                return (
                  <Box margin="auto">
                    <ListsLogo />
                    <Typography variant="h5" component="h5" align="center">
                      No list found
                    </Typography>
                  </Box>
                );
              }
              return (
                <Box display="flex" flexDirection="column" marginRight="auto">
                  <Typography variant="h6" component="h6">
                    {x.title}
                  </Typography>
                  <Box display="flex" marginLeft="auto">
                    <ListIcon />
                  </Box>
                  <Typography variant="h6" component="h6">
                   {x.isComplete?"Complete":"Incomplete"}
                  </Typography>
                  <Divider />
                </Box>
              );
            })}
            
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
