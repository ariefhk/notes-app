"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const NPProgresProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <ProgressBar height="4px" color="#FF1E00" options={{ showSpinner: false }} shallowRouting />
    </>
  );
};

export default NPProgresProvider;
