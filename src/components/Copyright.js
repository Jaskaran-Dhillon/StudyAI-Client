import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://www.mcmaster.ca/">
          Group 11
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }