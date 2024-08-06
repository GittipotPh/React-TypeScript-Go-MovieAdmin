
import { Alert } from "@mui/material";

export const AlertError = ({ message }: { message: string }) => (
  <Alert severity="error" sx={{ fontSize: "1.5rem" }}>
    {message}
  </Alert>
);

export const AlertSuccess = ({ message }: { message: string }) => (
  <Alert variant="filled" severity="success" sx={{ fontSize: "1.5rem" }}>
    {message}
  </Alert>
);

export const AlertErrorInput = ({ message }: { message: string }) => (
  <Alert severity="error" sx={{ fontSize: "1.5rem" }}>
    {message}
  </Alert>
);
