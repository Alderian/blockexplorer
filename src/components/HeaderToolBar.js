import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import { Container } from "@mui/material";
import Link from "@mui/material/Link";
import SearchBar from "./ui/SearchBar";

export default function HeaderToolBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Link color="#ffffff" href="/" underline="none">
              <Typography
                variant="h6"
                noWrap
                component="span"
                sx={{
                  display: { xs: "none", sm: "flex", alignItems: "center" },
                }}
              >
                <AdbIcon
                  sx={{
                    mr: 1,
                    ml: 1,
                  }}
                />
                Blockchain explorer
              </Typography>
            </Link>
            <SearchBar />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* Network selection */}

              {/* Theme selection */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
