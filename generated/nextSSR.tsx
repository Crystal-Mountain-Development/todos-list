import gql from 'graphql-tag';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import type { NormalizedCacheObject } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type List = {
  __typename?: 'List';
  id: Scalars['Int'];
  title: Scalars['String'];
  isComplete: Scalars['Boolean'];
  userId: Scalars['String'];
  todos: Array<Todo>;
};

export type ListInsertInput = {
  title: Scalars['String'];
};

export type ListUpdateInput = {
  title?: Maybe<Scalars['String']>;
  isComplete?: Maybe<Scalars['Boolean']>;
};

export type LoginMessage = {
  __typename?: 'LoginMessage';
  message: Scalars['String'];
  token?: Maybe<Scalars['String']>;
};

export type LoginToken = {
  __typename?: 'LoginToken';
  authorization?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  empty?: Maybe<Scalars['String']>;
  addTodo: Todo;
  updateTodo: Todo;
  deleteTodo: Todo;
  addList: List;
  updateList: List;
  deleteList: List;
  updateUser: User;
  sendAuthToken?: Maybe<LoginMessage>;
  login?: Maybe<LoginToken>;
  signin?: Maybe<SigninMessage>;
  googleEmailValidation?: Maybe<SigninToken>;
  emailValidation?: Maybe<SigninToken>;
  resendEmailValidation?: Maybe<SigninMessage>;
};


export type MutationAddTodoArgs = {
  insert: TodoInsertInput;
};


export type MutationUpdateTodoArgs = {
  id: Scalars['String'];
  update?: Maybe<TodoUpdateInput>;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['String'];
};


export type MutationAddListArgs = {
  insert: ListInsertInput;
};


export type MutationUpdateListArgs = {
  id: Scalars['Int'];
  update?: Maybe<ListUpdateInput>;
};


export type MutationDeleteListArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  update?: Maybe<UserUpdateInput>;
};


export type MutationSendAuthTokenArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSigninArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationGoogleEmailValidationArgs = {
  token: Scalars['String'];
};


export type MutationEmailValidationArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};


export type MutationResendEmailValidationArgs = {
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  empty?: Maybe<Scalars['String']>;
  todos: Array<Todo>;
  todo: Todo;
  lists: Array<List>;
  list: List;
  user: User;
};


export type QueryTodoArgs = {
  id: Scalars['String'];
};


export type QueryListArgs = {
  id: Scalars['Int'];
};

export type SigninMessage = {
  __typename?: 'SigninMessage';
  message: Scalars['String'];
  token?: Maybe<Scalars['String']>;
};

export type SigninToken = {
  __typename?: 'SigninToken';
  authorization?: Maybe<Scalars['String']>;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['String'];
  summary: Scalars['String'];
  isComplete?: Maybe<Scalars['Boolean']>;
  listId: Scalars['Int'];
};

export type TodoInsertInput = {
  summary: Scalars['String'];
  listId: Scalars['Int'];
};

export type TodoUpdateInput = {
  summary?: Maybe<Scalars['String']>;
  isComplete?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  lists: Array<List>;
};

export type UserInsertInput = {
  username: Scalars['String'];
  email: Scalars['String'];
};

export type UserUpdateInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type AddListMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type AddListMutation = (
  { __typename?: 'Mutation' }
  & { addList: (
    { __typename?: 'List' }
    & Pick<List, 'title' | 'isComplete'>
  ) }
);

export type EmailValidationMutationVariables = Exact<{
  email: Scalars['String'];
  token: Scalars['String'];
}>;


export type EmailValidationMutation = (
  { __typename?: 'Mutation' }
  & { emailValidation?: Maybe<(
    { __typename?: 'SigninToken' }
    & Pick<SigninToken, 'authorization'>
  )> }
);

export type GoogleEmailValidationMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type GoogleEmailValidationMutation = (
  { __typename?: 'Mutation' }
  & { googleEmailValidation?: Maybe<(
    { __typename?: 'SigninToken' }
    & Pick<SigninToken, 'authorization'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  token: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LoginToken' }
    & Pick<LoginToken, 'authorization'>
  )> }
);

export type MyListQueryVariables = Exact<{ [key: string]: never; }>;


export type MyListQuery = (
  { __typename?: 'Query' }
  & { lists: Array<(
    { __typename?: 'List' }
    & Pick<List, 'id' | 'isComplete' | 'title'>
  )> }
);

export type ResendEmailValidationMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResendEmailValidationMutation = (
  { __typename?: 'Mutation' }
  & { resendEmailValidation?: Maybe<(
    { __typename?: 'SigninMessage' }
    & Pick<SigninMessage, 'message' | 'token'>
  )> }
);

export type SendAuthTokenMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendAuthTokenMutation = (
  { __typename?: 'Mutation' }
  & { sendAuthToken?: Maybe<(
    { __typename?: 'LoginMessage' }
    & Pick<LoginMessage, 'message' | 'token'>
  )> }
);

export type SigninMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
}>;


export type SigninMutation = (
  { __typename?: 'Mutation' }
  & { signin?: Maybe<(
    { __typename?: 'SigninMessage' }
    & Pick<SigninMessage, 'message' | 'token'>
  )> }
);

export const AddListDocument = gql`
    mutation addList($title: String!) {
  addList(insert: {title: $title}) {
    title
    isComplete
  }
}
    `;
export const EmailValidationDocument = gql`
    mutation emailValidation($email: String!, $token: String!) {
  emailValidation(email: $email, token: $token) {
    authorization
  }
}
    `;
export const GoogleEmailValidationDocument = gql`
    mutation googleEmailValidation($token: String!) {
  googleEmailValidation(token: $token) {
    authorization
  }
}
    `;
export const LoginDocument = gql`
    mutation login($email: String!, $token: String!) {
  login(email: $email, token: $token) {
    authorization
  }
}
    `;
export const MyListDocument = gql`
    query myList {
  lists {
    id
    isComplete
    title
  }
}
    `;
export async function getServerPageMyList
    (options: Omit<Apollo.QueryOptions<MyListQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<MyListQuery>({ ...options, query: MyListDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export type PageMyListComp = React.FC<{data?: MyListQuery, error?: Apollo.ApolloError}>;
export const withPageMyList = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<MyListQuery, MyListQueryVariables>) => (WrappedComponent:PageMyListComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(MyListDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrMyList = {
      getServerPage: getServerPageMyList,
      withPage: withPageMyList,
      
    }
export const ResendEmailValidationDocument = gql`
    mutation resendEmailValidation($email: String!) {
  resendEmailValidation(email: $email) {
    message
    token
  }
}
    `;
export const SendAuthTokenDocument = gql`
    mutation sendAuthToken($email: String!) {
  sendAuthToken(email: $email) {
    message
    token
  }
}
    `;
export const SigninDocument = gql`
    mutation signin($email: String!, $username: String!) {
  signin(email: $email, username: $username) {
    message
    token
  }
}
    `;