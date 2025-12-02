import { Button, Select } from "antd";
import { useEffect, useRef } from "react";

const roleList = [
  "Junior Developer",
  "HR Assistant",
  "Accountant",
  "Digital Marketing Executive",
  "Operations Coordinator",
  "Frontend Developer",
  "Backend Developer",
  "Recruitment Officer",
  "Finance Officer",
  "SEO Specialist",
];

const RoleFilterDropdown = ({
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
    <div
      style={{
        padding: "7px",
        display: "flex",
        gap: "10px",
      }}
    >
      <Select
        style={{ width: "200px" }}
        allowClear
        showSearch={true}
        mode="multiple"
        placeholder="Selece role(s)"
        value={selectedKeys || []}
        onChange={(value) => setSelectedKeys(value ? value : [])}
      >
        {roleList.map((role, index) => (
          <Select.Option key={index} value={role}>
            {role}
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
const RoleColumn = {
  title: "Role",
  dataIndex: "role",
  key: "role",
  filterDropdown: RoleFilterDropdown,
  onFilter: (values, record) => {
    if (!values || values.length === 0) return true;
    return values.includes(record.role);
  },
  sorter: (a, b) => a.role.localeCompare(b.role),
};
export default RoleColumn;
