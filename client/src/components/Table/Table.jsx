import { Table } from "antd";
import columns from "./Columns/Columns";

//Table content
const DataTable = ({ loading, tableData }) => {
  return (
    <>
      <Table
        style={{ paddingRight: "10px" }}
        loading={{
          spinning: loading,
          tip: "Loading...",
        }}
        dataSource={tableData}
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
