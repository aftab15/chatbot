import { Card, Table } from "flowbite-react";
import * as React from "react";

const MessageCustomContent = ({ id, message }) => {
  return (
    <>
      {((message.direction == "incoming" && id == 0) ||
        message.direction !== "incoming") && <div>{message.message}</div>}

      {message.direction == "incoming" && id > 0 && message.status == "200" ? (
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              {Object.keys(message.responseObject[0]).map((key,index) => (
                <Table.HeadCell key={index}>{key.replace(/_/g, " ")}</Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className="divide-y">
              {message.responseObject.map((item, index) => {
                return (
                  <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  {Object.values(item).map((value,index) => (
                    <Table.Cell key={index}>{value || '---'}</Table.Cell>
                  ))}
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      ) : message.direction == "incoming" && id > 0 && message.status != 200 ? (
        <div>{message.message}</div>
      ) : null}
    </>
  );
};

export default MessageCustomContent;
