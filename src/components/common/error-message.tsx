import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  errorMessage?: string;
};

const ErrorMessage = ({ errorMessage }: Props) => {
  return (
    <p
      className={cn("invisible text-sm  font-medium text-destructive", {
        visible: errorMessage,
      })}
    >
      {errorMessage}
    </p>
  );
};

export default ErrorMessage;
