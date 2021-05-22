/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: giveFeedback
// ====================================================

export interface giveFeedback_giveFeedback {
  __typename: "Acknowledged";
  acknowledged: boolean | null;
}

export interface giveFeedback {
  giveFeedback: giveFeedback_giveFeedback | null;
}

export interface giveFeedbackVariables {
  reviewEmployee: string;
  feedback: string;
  reviewer?: string | null;
}
