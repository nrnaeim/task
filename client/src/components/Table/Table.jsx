import { Spin, Table } from "antd";
import { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../../Contexts/Contexts";
import columns from "./Columns/Columns";

//Table content
function DataTable() {
  const { loading, setLoading, tableData } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(id);
  }, [tableData]);

  return (
    <>
      <Table
        style={{ paddingRight: "10px" }}
        loading={loading}
        dataSource={tableData}
        columns={columns}
        sticky={true}
        tableLayout="auto"
        pagination={{ placement: ["bottomCenter"] }}
        rowKey={(record) => record._id}
      />
    </>
  );
}

export default DataTable;
