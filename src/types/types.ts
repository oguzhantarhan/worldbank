import { ReactNode } from "react";

export type ChildrenType = {
  children: ReactNode;
};

export type DataErrorType<Type> = {
  data: Type;
  errorMessage: string;
  error: boolean;
};
