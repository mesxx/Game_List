import React, { useContext, useEffect } from "react";
import { Table, Spinner, Button } from "flowbite-react";

import { GlobalContext } from "../context/GlobalContext";

export default function Tables() {
  const { state, handleFunction } = useContext(GlobalContext);
  const { data, fetchStatus, setFetchStatus } = state;
  const { fetchData, handleDetail, handleForm } = handleFunction;

  useEffect(() => {
    if (fetchStatus === true) {
      fetchData();
      setFetchStatus(false);
    }
    // eslint-disable-next-line
  }, []);
  if (!data) {
    return (
      <div className="grid h-screen place-items-center">
        <Spinner aria-label="Center-aligned spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 my-5">
      <Button onClick={handleForm} className="my-5">
        Add Game
      </Button>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data?.map((el, i) => {
            return (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {i + 1}
                </Table.Cell>
                <Table.Cell>{el?.title}</Table.Cell>
                <Table.Cell>
                  <span
                    onClick={handleDetail}
                    className="font-medium text-blue-600 hover:underline cursor-pointer"
                    data-id={el?.id}
                  >
                    Detail
                  </span>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
