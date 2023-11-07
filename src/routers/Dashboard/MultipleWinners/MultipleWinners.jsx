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
} from "@mui/material";

import movieFetcher from "../../../axios/config";

import { useTranslation } from "react-i18next";

const MultipleWinnersList = () => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      { id: "year", label: t("home.years"), minWidth: 50 },
      { id: "winnerCount", label: t("home.winnerCount"), minWidth: 50 },
    ],
    [t]
  );

  const [winners, setWinners] = useState([]);

  const [totalElements, setTotalElements] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await movieFetcher.get(
          "?projection=years-with-multiple-winners"
        );

        const jsonData = response.data;

        setWinners(jsonData.years);

        setTotalElements(jsonData.years.length);
      } catch (err) {
        console.error(err.message);
      }
    };

    getMovies();
  }, [page, rowsPerPage]);

  return (
    <>
      <h1 className="tableTitle">{t("home.multipleWinners")}</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
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
            {winners.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.year}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
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
