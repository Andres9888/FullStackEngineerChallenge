/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: users
// ====================================================

export interface users_users_review {
  __typename: "review";
  author: string;
  review: string;
}

export interface users_users {
  __typename: "user";
  name: string;
  image: string | null;
  review: users_users_review[];
}

export interface users {
  users: users_users[];
}
