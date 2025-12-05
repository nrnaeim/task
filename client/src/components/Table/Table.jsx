import { Table } from "antd";
import columns from "./Columns/Columns";
import useAppStore from "../../store/app.store";

//Table content
const DataTable = ({ tableData }) => {
  const loading = useAppStore((s) => s.loading);
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
