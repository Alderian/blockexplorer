import { createTheme } from "@mui/material/styles";
import NextLink from "next/link";
import { forwardRef } from "react";

// Use mui Link with NextJS Link
const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
  return <NextLink ref={ref} {...props} />;
});

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour,
      },
    },
  },
});

export default theme;
