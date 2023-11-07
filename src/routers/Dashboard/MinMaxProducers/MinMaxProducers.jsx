import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import movieFetcher from "../../../axios/config";

import { useTranslation } from "react-i18next";

const MultipleWinnersList = () => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      { id: "producer", label: t("home.producer"), minWidth: 40 },
      { id: "interval", label: t("home.winCount"), minWidth: 40 },
      { id: "previousWin", label: t("home.previousWin"), minWidth: 40 },
      { id: "followingWin", label: t("home.followingWin"), minWidth: 40 },
    ],
    [t]
  );

  const [minProducer, setMinProducer] = useState([]);
  const [maxProducer, setMaxProducer] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await movieFetcher.get(
          "?projection=max-min-win-interval-for-producers"
        );

        const jsonData = response.data;

        setMinProducer(jsonData.min);

        setMaxProducer(jsonData.max);
      } catch (err) {
        console.error(err.message);
      }
    };

    getMovies();
  }, []);

  return (
    <>
      <h1 className="tableTitle">{t("home.producersInterval")}</h1>
      <TableContainer component={Paper}>
        <h2 className="subTitle">{t("home.min")}</h2>
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
            {minProducer.map((row) => {
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
          <br></br>
        </Table>
        <h2 className="subTitle">{t("home.max")}</h2>
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
            {maxProducer.map((row) => {
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
      </TableContainer>
    </>
  );
};

export default MultipleWinnersList;
