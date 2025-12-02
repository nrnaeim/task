import { Button, Select } from "antd";
import { useEffect, useRef } from "react";
const statusList = ["Active", "Inactive", "On Leave"];
const StatusFilterDropdown = ({
  selectedKeys,
  setSelectedKeys,
  confirm,
  clearFilters,
}) => {
  const timeOutId = useRef(null);
  useEffect(() => {
    if (timeOutId.current) clearTimeout(timeOutId.current);
    timeOutId.current = setTimeout(() => {
      confirm({ closeDropdown: false });
    }, 500);

    return () => clearTimeout(timeOutId.current);
  }, [selectedKeys]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        padding: "7px",
      }}
    >
      <Select
        style={{ width: "200px" }}
        showSearch
        allowClear
        mode="multiple"
        placeholder="Enter status"
        value={selectedKeys || []}
        onChange={(value) => setSelectedKeys(value ? [...value] : [])}
      >
        {statusList.map((status, index) => (
          <Select.Option key={index} value={status}>
            {status}
          </Select.Option>
        ))}
      </Select>
      <Button
        type="primary"
        danger={true}
        onClick={() => {
          setSelectedKeys([]);
          clearFilters();
        }}
      >
        Clear
      </Button>
    </div>
  );
};

const StatusColumn = {
  title: "Status",
  dataIndex: "status",
  key: "status",
  sorter: (a, b) => a.status.localeCompare(b.status),
  filterDropdown: StatusFilterDropdown,
  onFilter: (value, record) => {
    return record.status.toLowerCase() === value.toLowerCase();
  },
};

export default StatusColumn;
