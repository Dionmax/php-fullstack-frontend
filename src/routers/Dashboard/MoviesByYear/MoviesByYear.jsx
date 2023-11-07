import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
} from "@mui/material";

import movieFetcher from "../../../axios/config";

import { useTranslation } from "react-i18next";

const MultipleWinnersList = () => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      { id: "id", label: "Id" },
      { id: "year", label: t("home.year") },
      { id: "title", label: t("home.title") },
      { id: "studios", label: t("home.studios") },
      { id: "producers", label: t("home.producers") },
      { id: "winner", label: t("home.winner") },
    ],
    [t]
  );

  const [movie, setMovie] = useState([]);

  const [totalElements, setTotalElements] = useState(0);

  const [year, setYear] = useState(1986);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await movieFetcher.get("", {
          params: {
            year: year,
            winner: true,
          },
        });

        setMovie(response.data);

        setTotalElements(response.data.length);
      } catch (err) {
        console.error(err.message);
      }
    };

    getMovies();
  }, [page, rowsPerPage, year]);

  return (
    <>
      <h1 className="tableTitle">{t("home.listMovieByYear")}</h1>
      <TableContainer component={Paper}>
        <div className="containerSearchBar">
          <TextField
            className="searchBar"
            label={t("home.search")}
            value={year}
            onChange={handleYearChange}
            fullWidth
            variant="standard"
          />
        </div>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {movie.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.year}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : column.id === "winner" && value === true
                          ? "Yes"
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10]}
          component="div"
          count={totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default MultipleWinnersList;
