import { Card, Table } from "flowbite-react";
import * as React from "react";

const MessageCustomContent = ({ id, message }) => {
  return (
    <>
      {((message.direction == "incoming" && id == 0) ||
        message.direction !== "incoming") && <div>{message.message}</div>}

      {message.direction == "incoming" && id > 0 && message.status == "200" ? (
        // <Card className="max-w-sm max-h-[300px] overflow-y-auto">
        //   <div className="flow-root">
        //     <ul className="divide-y divide-gray-200">
        //       {message.responseObject.map((item, index) => {
        //         return (
        //           <li className="py-3 sm:py-3" key={index}>
        //             <div className="flex flex-col gap-2">
        //               <div className="min-w-0 flex-1 justify-start">
        //                 <p className="truncate text-sm font-medium text-gray-900 text-left">
        //                   Full Name
        //                 </p>
        //                 <p className="truncate text-sm text-gray-500 text-left">
        //                   {item.Full_Name || "Not available"}
        //                 </p>
        //               </div>
        //               <div className="min-w-0 flex-1 justify-start">
        //                 <p className="truncate text-sm font-medium text-gray-900 text-left">
        //                   Company Name
        //                 </p>
        //                 <p className="truncate text-sm text-gray-500 text-left">
        //                   {item.Company_Name || "Not available"}
        //                 </p>
        //               </div>
        //               <div className="min-w-0 flex-1 justify-start">
        //                 <p className="truncate text-sm font-medium text-gray-900 text-left">
        //                   Job Title
        //                 </p>
        //                 <p className="truncate text-sm text-gray-500 text-left">
        //                   {item.Job_Title || "Not available"}
        //                 </p>
        //               </div>
        //               <div className="min-w-0 flex-1 justify-start">
        //                 <p className="truncate text-sm font-medium text-gray-900 text-left">
        //                   Contact Location
        //                 </p>
        //                 <p className="truncate text-sm text-gray-500 text-left">
        //                   {item.Contact_Location || "Not available"}
        //                 </p>
        //               </div>
        //               <div className="min-w-0 flex-1 justify-start">
        //                 <p className="truncate text-sm font-medium text-gray-900 text-left">
        //                   Job Started On
        //                 </p>
        //                 <p className="truncate text-sm text-gray-500 text-left">
        //                   {item.Job_Started_On || "Not available"}
        //                 </p>
        //               </div>
        //               <div className="min-w-0 flex-1 justify-start">
        //                 <p className="truncate text-sm font-medium text-gray-900 text-left">
        //                   Level
        //                 </p>
        //                 <p className="truncate text-sm text-gray-500 text-left">
        //                   {item.Level || "Not available"}
        //                 </p>
        //               </div>
        //               <div className="min-w-0 flex-1 justify-start">
        //                 <p className="truncate text-sm font-medium text-gray-900 text-left">
        //                   Function
        //                 </p>
        //                 <p className="truncate text-sm text-gray-500 text-left">
        //                   {item.Function || "Not available"}
        //                 </p>
        //               </div>
        //               <div className="min-w-0 flex-1 justify-start">
        //                 <p className="truncate text-sm font-medium text-gray-900 text-left">
        //                   Contact Linkedin Url
        //                 </p>
        //                 <a
        //                   href={item.Contact_LinkedinUrl}
        //                   className="text-sm font-medium text-cyan-600 hover:underline text-left flex"
        //                   target="_blank"
        //                 >
        //                 {item.Contact_LinkedinUrl || "Not available"}
        //                 </a>
        //               </div>
        //             </div>
        //           </li>
        //         );
        //       })}
        //     </ul>
        //   </div>
        // </Card>
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
                    <Table.Cell>{item.Full_Name || "Not available"}</Table.Cell>
                    <Table.Cell>
                      {item.Company_Name || "Not available"}
                    </Table.Cell>
                    <Table.Cell>{item.Job_Title || "Not available"}</Table.Cell>
                    <Table.Cell>
                      {item.Contact_Location || "Not available"}
                    </Table.Cell>
                    <Table.Cell>
                      {item.Job_Started_On || "Not available"}
                    </Table.Cell>
                    <Table.Cell>{item.Level || "Not available"}</Table.Cell>
                    <Table.Cell>{item.Function || "Not available"}</Table.Cell>
                    <Table.Cell>
                      <a href={item.Contact_LinkedinUrl} target="_blank">
                      {item.Contact_LinkedinUrl || "Not available"}
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
        message.status != "200" ? (
        <div>There are no contacts try modifying your prompt</div>
      ) : null}
    </>
  );
};

export default MessageCustomContent;
