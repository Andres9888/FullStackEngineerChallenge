/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAssignedEmployees
// ====================================================

export interface getAssignedEmployees_getAssignedEmployees_profileReview_review {
  __typename: "review";
  author: string;
  review: string;
}

export interface getAssignedEmployees_getAssignedEmployees_profileReview {
  __typename: "user";
  name: string;
  image: string | null;
  review: getAssignedEmployees_getAssignedEmployees_profileReview_review[];
}

export interface getAssignedEmployees_getAssignedEmployees {
  __typename: "employeesProfile";
  profileReview: (getAssignedEmployees_getAssignedEmployees_profileReview | null)[] | null;
}

export interface getAssignedEmployees {
  getAssignedEmployees: (getAssignedEmployees_getAssignedEmployees | null)[] | null;
}

export interface getAssignedEmployeesVariables {
  name: string;
}
