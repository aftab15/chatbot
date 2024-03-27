import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const MessageCustomContent = ({ id, message }) => {
  return (
    <>
      {((message.direction == "incoming" && id == 0) ||
        message.direction !== "incoming") && <div>{message.message}</div>}

      {message.direction == "incoming" && id > 0 && message.status == '200' ? (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell align="right">Categories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {message.responseObject.map((item, index)=>{
            return(
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={index}
            >
              <TableCell component="th" scope="row">
                {item?.Full_Name || '---'}
              </TableCell>
              <TableCell align="right">{item?.Company_Name || '---'}</TableCell>
            </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </TableContainer>
      ) : message.direction == "incoming" && id > 0 && message.status != '200' ? <div>error occured!!</div> : null}

    </>
  );
};

export default MessageCustomContent;
