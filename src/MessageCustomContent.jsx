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
              <Table.HeadCell>Full Name</Table.HeadCell>
              <Table.HeadCell>Company Name</Table.HeadCell>
              <Table.HeadCell>Job Title</Table.HeadCell>
              <Table.HeadCell>Contact Location</Table.HeadCell>
              <Table.HeadCell>Job Started On</Table.HeadCell>
              <Table.HeadCell>Level</Table.HeadCell>
              <Table.HeadCell>Function</Table.HeadCell>
              <Table.HeadCell>Contact Linkedin Url</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {message.responseObject.map((item, index) => {
                return (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{item.Full_Name || "---"}</Table.Cell>
                    <Table.Cell>
                      {item.Company_Name || "---"}
                    </Table.Cell>
                    <Table.Cell>{item.Job_Title || "---"}</Table.Cell>
                    <Table.Cell>
                      {item.Contact_Location || "---"}
                    </Table.Cell>
                    <Table.Cell>
                      {item.Job_Started_On || "---"}
                    </Table.Cell>
                    <Table.Cell>{item.Level || "---"}</Table.Cell>
                    <Table.Cell>{item.Function || "---"}</Table.Cell>
                    <Table.Cell>
                      <a href={item.Contact_LinkedinUrl} target="_blank">
                      {item.Contact_LinkedinUrl || "---"}
                      </a>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      ) : message.direction == "incoming" &&
        id > 0 &&
        message.status != 200 ? (
        <div>{message.message}</div>
      ) : null}
    </>
  );
};

export default MessageCustomContent;
