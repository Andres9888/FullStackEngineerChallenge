/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addEmployee
// ====================================================

export interface addEmployee_addEmployee {
  __typename: "Acknowledged";
  acknowledged: boolean | null;
}

export interface addEmployee {
  addEmployee: addEmployee_addEmployee | null;
}

export interface addEmployeeVariables {
  name: string;
  feedback: string;
  picture?: string | null;
}
