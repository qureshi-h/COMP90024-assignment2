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
        fontSize: "2rem",
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

export default function AllStatsTable({ info }) {
    const [data, setData] = React.useState([]);

    const format_data = () => {
        const lgas = [];
        const sectors = [
            "education",
            "secularism",
            "substance abuse",
            "violence",
            "mental health",
        ];
        for (var i = 0; i < info.length; i++) {
            const curr_lga = info[i].key[0];
            if (!lgas.includes(curr_lga)) {
                lgas.push(curr_lga);

                const entry = {};
                const sub_info = info.filter((region) => {
                    return region.key[0] === curr_lga;
                });
                for (var j = 0; j < sectors.length; j++) {
                    const result = sub_info.filter((region) => {
                        return region.key && region.key[1] === sectors[j];
                    });
                    entry[sectors[j]] = result.length > 0 ? result[0].value : 0;
                }
                data.push({ lga: curr_lga, value: entry });
            }
        }
        console.log(data);
    };

    format_data();

    return (
        <TableContainer
            component={Paper}
            sx={{ height: "50vh", width: "60vw", zIndex: -1 }}
        >
            <Table stickyHeader aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell
                            colSpan={1}
                            align="center"
                            sx={{ fontSize: "2rem" }}
                        >
                            LGA Name
                        </StyledTableCell>
                        <StyledTableCell
                            colSpan={1}
                            align="center"
                            sx={{ fontSize: "2rem" }}
                        >
                            Education
                        </StyledTableCell>
                        <StyledTableCell
                            colSpan={1}
                            align="center"
                            sx={{ fontSize: "2rem" }}
                        >
                            Religion
                        </StyledTableCell>
                        <StyledTableCell
                            colSpan={1}
                            align="center"
                            sx={{ fontSize: "2rem" }}
                        >
                            Substance Abuse
                        </StyledTableCell>
                        <StyledTableCell
                            colSpan={1}
                            align="center"
                            sx={{ fontSize: "2rem" }}
                        >
                            Violence
                        </StyledTableCell>
                        <StyledTableCell
                            colSpan={1}
                            align="center"
                            sx={{ fontSize: "2rem" }}
                        >
                            Mental Health
                        </StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody sx={{ border: "1px solid black" }}>
                    {data.map((lga_data, index) => (
                        <StyledTableRow key={index} sx={{ width: "40vw" }}>
                            <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                {lga_data.lga}
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                {lga_data.value.education}
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                {lga_data.value.secularism}
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                {lga_data.value["substance abuse"]}
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                {lga_data.value.violence}
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                {lga_data.value["mental health"]}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
