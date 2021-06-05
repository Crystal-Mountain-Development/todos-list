import { Box, Container } from "@material-ui/core";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { initializeApollo } from "../../apollo/client";
import { useTodosQuery } from "../../generated/graphql";
import { getServerPageTodos } from "../../generated/nextSSR";

const IndexPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useTodosQuery({ variables: { listId: Number(id) } });

  return (
    <Container maxWidth="xs">
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        height="100vh"
        pt={3}
      >
        {data?.list.todos.map((x) => x.summary)}
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};

  if (!id || Number.isNaN(Number(id))) throw new Error("Invalid List Id");

  const apolloClient = initializeApollo({
    headers: context.req.headers as Record<string, string>,
  });

  return getServerPageTodos(
    { variables: { listId: Number(id) } },
    apolloClient
  );
};

export default IndexPage;
