import React from "react";
import { Alert } from "@mui/material";
const ErrorMessage = ({ children }) => children ? <Alert severity="error" sx={{ my: 1 }}>{children}</Alert> : null;
export default ErrorMessage;