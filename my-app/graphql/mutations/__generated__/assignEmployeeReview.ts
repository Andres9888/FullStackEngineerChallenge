/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: assignEmployeeReview
// ====================================================

export interface assignEmployeeReview_assignEmployeeReview {
  __typename: "Acknowledged";
  acknowledged: boolean | null;
}

export interface assignEmployeeReview {
  assignEmployeeReview: assignEmployeeReview_assignEmployeeReview | null;
}

export interface assignEmployeeReviewVariables {
  assignEmployee: string;
  employeeNameToReview: string;
}
