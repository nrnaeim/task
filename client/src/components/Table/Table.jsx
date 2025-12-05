import { Table } from "antd";
import { useEffect } from "react";
import columns from "./Columns/Columns";
import useEmployeeStore from "../../store/employee.store";

//Table content
const DataTable = () => {
  const fetchEmployees = useEmployeeStore((s) => s.fetchEmployees);
  const employees = useEmployeeStore((s) => s.employees);
  const loading = useEmployeeStore((s) => s.loading);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <>
      <Table
        style={{ paddingRight: "10px" }}
        loading={{
          spinning: loading,
          tip: "Loading...",
        }}
        dataSource={employees}
        columns={columns}
        sticky={true}
        tableLayout="auto"
        pagination={{ placement: ["bottomCenter"] }}
        rowKey={(record) => record._id}
      />
    </>
  );
};

export default DataTable;
