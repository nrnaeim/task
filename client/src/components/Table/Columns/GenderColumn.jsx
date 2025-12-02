import { Button, Select } from "antd";
import { useEffect, useRef } from "react";

const GenderFilterDropdown = ({
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
        allowClear
        showSearch={true}
        mode="multiple"
        placeholder="Selece gender"
        value={selectedKeys || []}
        onChange={(value) => setSelectedKeys(value ? value : [])}
      >
        <Select.Option key="male" value="Male">
          Male
        </Select.Option>
        <Select.Option key="female" value="Female">
          Female
        </Select.Option>
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

const GenderColumn = {
  title: "Gender",
  dataIndex: "gender",
  key: "gender",
  sorter: (a, b) => a.gender.localeCompare(b.gender),
  filterDropdown: GenderFilterDropdown,
  onFilter: (value, record) => {
    if (!value || value.length === 0) return true;
    return value.toLowerCase() === record.gender.toLowerCase();
  },
};
export default GenderColumn;
