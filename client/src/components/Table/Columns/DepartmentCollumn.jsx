import { Button, Select } from "antd";
import { useEffect, useRef } from "react";

const departmentList = [
  "Engineering",
  "HR",
  "Finance",
  "Marketing",
  "Operations",
  "Support",
  "IT",
  "test",
];

const DepartmentFilterDropdown = ({
  selectedKeys,
  setSelectedKeys,
  confirm,
  clearFilters,
}) => {
  const timeOutIdRef = useRef(null);
  useEffect(() => {
    if (timeOutIdRef.current) clearTimeout(timeOutIdRef.current);
    timeOutIdRef.current = setTimeout(() => {
       confirm({ closeDropdown: false });
    }, 500);
    return () => clearTimeout(timeOutIdRef.current);
  }, [selectedKeys]);

  return (
    <div style={{ padding: "5px", display: "flex", gap: "10px" }}>
      <Select
        style={{ width: "200px" }}
        allowClear
        mode="multiple"
        placeholder="Selece department(s)"
        showSearch={true}
        value={selectedKeys || []}
        onChange={(value) => setSelectedKeys(value ? value : [])}
      >
        {departmentList.map((department, index) => (
          <Select.Option key={index} value={department}>
            {department}
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

const DepartmentColumn = {
  title: "Department",
  dataIndex: "department",
  key: "department",
  sorter: (a, b) => a.department.localeCompare(b.department),
  filterDropdown: DepartmentFilterDropdown,
  onFilter: (values, record) => {
    if (!values || values.length === 0) return true;
    return values.includes(record.department);
  },
};

export default DepartmentColumn;
