import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useEffect, useRef } from "react";

const NameFilterDropdown = ({
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
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "10px",
        padding: "7px",
        backgroundColor: "#dedede",
      }}
    >
      <Input
        id="name"
        name="name"
        style={{ border: "none", outline: "none" }}
        allowClear
        autoFocus={true}
        placeholder="Enter name here"
        value={selectedKeys[0] || ""}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => confirm({ closeDropdown: false })}
      />

      <Button
        type="primary"
        danger={true}
        onClick={() => {
          clearFilters();
          setSelectedKeys([]);
          confirm({ closeDropdown: false });
        }}
      >
        Clear
      </Button>
    </div>
  );
};

const NameColumn = {
  title: "Name",
  dataIndex: "name",
  key: "name",
  sorter: (a, b) => a.name.localeCompare(b.name),
  filterDropdown: NameFilterDropdown,
  onFilter: (value, record) => {
    const regExp = new RegExp(value, "ig");
    return regExp.test(record.name);
  },
  filterIcon: () => {
    return <SearchOutlined style={{ margin: "5px" }} />;
  },
};

export default NameColumn;
