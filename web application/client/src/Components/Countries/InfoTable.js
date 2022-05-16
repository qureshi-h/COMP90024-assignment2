import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function InfoTable({ info }) {
    const data = [
        { key: "Common Name", value: `${info.name.common} ${info.flag}` },
        { key: "Capital", value: info.capital.join(", ") },
        { key: "Timezone", value: info.timezones.join(", ") },
        { key: "Population", value: info.population },
        { key: "Languages", value: Object.values(info.languages).join(", ") },
        {
            key: "Currencies",
            value: Object.values(info.currencies)
                .map((currency) => currency.name)
                .join(", "),
        },
        { key: "Area", value: info.area },
        {
            key: "Borders",
            value: info.borders ? info.borders.join(", ") : "None",
        },
        { key: "Sub-Region", value: info.subregion },
        { key: "Continents", value: info.continents.join(", ") },
        { key: "Land-Locked", value: info.landlocked ? "Yes" : "No" },
        { key: "Independent", value: info.independent ? "Yes" : "No" },
        { key: "UN Member", value: info.unMember ? "Yes" : "No" },
    ];
    return (
        <TableContainer component={Paper} sx={{ height: "50vh" }}>
            <Table stickyHeader aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell colSpan={2} align="center">
                            {info.name.official}
                        </StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody sx={{ border: "1px solid black" }}>
                    {data.map((data, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                {data.key}
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                {data.value}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
