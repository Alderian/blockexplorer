import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import Hash from "./ui/Hash";
import Link from "./ui/Link";

const MAX_ITEMS_PRE_PAGE = process.env.NEXT_PUBLIC_MAX_ITEMS_PER_PAGE;

function preventDefault(event) {
  event.preventDefault();
}

export default function Blocks({ blocks }) {
  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: "1 1 80%" }}
          component="h2"
          variant="h6"
          color="primary"
          gutterBottom
        >
          Latest Blocks
        </Typography>
        <Link
          color="primary"
          href="#"
          onClick={preventDefault}
          sx={{ fontSize: "small" }}
        >
          View all blocks
        </Link>
      </Toolbar>
      {blocks ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Block Hash</TableCell>
              <TableCell>Txs</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blocks.map((t, i) => (
              <TableRow key={i} variant="overline">
                <TableCell>{t.number}</TableCell>
                <TableCell>
                  <Hash path="block" hash={t.hash} />
                </TableCell>
                <TableCell>{t.transactions}</TableCell>
                <TableCell>{t.timePassed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Skeleton variant="rectangular" width="100%" height={220} />
      )}
    </>
  );
}
