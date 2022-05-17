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
        fontSize: "1rem",
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

export default function LgaTable({ info, lga, aurin }) {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        format_data();
    }, []);

    const format_data = () => {
        const lgas = [];
        const sectors = [
            "education",
            "secularism",
            "substance abuse",
            "violence",
            "mental health",
        ];

        const entry = {};
        const sub_info = info.filter((region) => {
            return region.key[0] === lga;
        });
        for (var j = 0; j < sectors.length; j++) {
            const result = sub_info.filter((region) => {
                return region.key[1] === sectors[j];
            });
            entry[sectors[j]] = result.length > 0 ? result[0].value : 0;
        }

        const aurin_data = aurin.filter((record) => record.key === lga);
        console.log(aurin_data[0].value);

        const merged = { ...entry, ...aurin_data[0].value };
        setData([
            {
                field: "Percentage of people with a higher education qualification",
                aurin: merged[
                    "Percentage of people with a higher education qualification"
                ],
                twitter: merged["education"],
            },

            {
                field: "Drug and alcohol clients per 1000",
                aurin: merged["Drug and alcohol clients per 1000"],
                twitter: merged["substance abuse"],
            },

            {
                field: "Percentage of people who are members of a religious group",
                aurin: merged[
                    "Number of people who are members of a religious group"
                ],
                twitter: merged["secularism"],
            },

            {
                field: "Percentage of 19 year olds completed year 12",
                aurin: merged["Percentage of 19 year olds completed year 12"],
                twitter: merged["education"],
            },

            {
                field: "Family Violence incidents per 1000",
                aurin: merged["Family Violence incidents per 1000"],
                twitter: merged["violence"],
            },

            {
                field: "People aged over 18 who are current smokers",
                aurin: merged["People aged over 18 who are current smokers"],
                twitter: merged["substance abuse"],
            },

            {
                field: "Regular mental health clients per 1000",
                aurin: merged["Regular mental health clients per 1000"],
                twitter: merged["mental health"],
            },
        ]);
    };

    return (
        <div>
            {data.length > 0 && (
                <TableContainer
                    component={Paper}
                    sx={{
                        height: "auto",
                        width: "40vw",
                        marginTop: "10vh",
                    }}
                >
                    <Table stickyHeader aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell
                                    colSpan={1}
                                    align="center"
                                    sx={{ fontSize: "1rem", padding: "1.5vh" }}
                                >
                                    Fields
                                </StyledTableCell>
                                <StyledTableCell
                                    colSpan={1}
                                    align="center"
                                    sx={{ fontSize: "1rem", padding: "1.5vh" }}
                                >
                                    Aurin Data
                                </StyledTableCell>
                                <StyledTableCell
                                    colSpan={1}
                                    align="center"
                                    sx={{ fontSize: "1rem", padding: "1.5vh" }}
                                >
                                    Tweet Counts
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody sx={{ border: "1px solid black" }}>
                            {data.map((value, index) => (
                                <StyledTableRow
                                    // key={index}
                                    sx={{ width: "40vw" }}
                                >
                                    <StyledTableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                    >
                                        {value.field}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                    >
                                        {value.aurin}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                    >
                                        {value.twitter}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}
