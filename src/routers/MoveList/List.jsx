import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, getGridStringOperators } from "@mui/x-data-grid";
import movieFetcher from "../../axios/config";
import { styled } from "@mui/material/styles";
import "./List.css";
import { useTranslation } from "react-i18next";

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["equals"].includes(value)
);

const StyledDataGrid = styled(DataGrid)(() => ({
  border: 0,
  color: "#fff",
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `1px solid #303030`,
    backgroundColor: "#303030",
    fontSize: "1rem",
  },
  "& .MuiDataGrid-cell": {
    color: "rgba(255,255,255,0.65)",
    backgroundColor: "#303030",
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "#303030",
    color: "#fff",
  },
  "& .MuiTablePagination-selectLabel": {
    color: "#fff",
  },
  "& .MuiTablePagination-root": {
    color: "#fff",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiSvgIcon-root": {
    fill: "#fff",
    color: "#fff",
  },
}));

export default function List() {
  const { t } = useTranslation();

  const columns = [
    { field: "id", headerName: "ID", width: 80, filterable: false },
    { field: "year", headerName: t("home.year"), width: 80, filterOperators },
    {
      field: "title",
      headerName: t("home.title"),
      width: 250,
      filterable: false,
    },
    {
      field: "studios",
      headerName: t("home.studios"),
      width: 250,
      filterable: false,
    },
    {
      field: "producers",
      headerName: t("home.producer"),
      width: 250,
      filterable: false,
    },
    {
      field: "winner",
      headerName: t("home.winner"),
      width: 90,
      type: "boolean",
    },
  ];

  const [movies, setMovies] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [year, setYear] = useState(null);
  const [winner, setWinner] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [filterModel, setFilterModel] = useState();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await movieFetcher.get("", {
          params: {
            page: paginationModel.page,
            size: paginationModel.pageSize,
            winner: winner,
            year: year,
          },
        });

        const jsonData = response.data;

        setMovies(jsonData.content);

        setTotalElements(jsonData.totalElements);
      } catch (err) {
        console.error(err.message);
      }
    };

    getMovies();
  }, [paginationModel, year, winner]);

  useEffect(() => {
    if (filterModel?.items.length > 0) {
      if (filterModel?.items[0].field === "winner") {
        setWinner(filterModel?.items[0].value);
        setYear(null);
      }

      if (filterModel?.items[0].field === "year") {
        setYear(filterModel?.items[0].value);
        setWinner(null);
      }
    }
  }, [filterModel, winner, year]);

  return (
    <>
      <h1 className="ListTitle">{t("home.movieList")}</h1>
      <Box sx={{ height: "70%", width: "100%" }}>
        <StyledDataGrid
          rows={movies}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: paginationModel.pageSize,
              },
            },
          }}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 25]}
          rowCount={totalElements}
          disableRowSelectionOnClick
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
        />
      </Box>
    </>
  );
}
