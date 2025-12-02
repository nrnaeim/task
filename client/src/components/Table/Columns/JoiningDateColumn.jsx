import { Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const JoiningDateFilterDropdown = ({
  selectedKeys,
  setSelectedKeys,
  confirm,
  clearFilters,
}) => {
  const [range, setRange] = useState([]);
  const timeOutIdRef = useRef(null);
  const onChangeHandler = (value) => {
    if (value) {
      setRange(value);
      const [startDate, endDate] = value;
      setSelectedKeys([{ startDate, endDate }]);
    } else {
      setRange([]);
      setSelectedKeys([]);
    }
  };

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
        justifyContent: "space-between",
        gap: "5px",
        padding: "7px",
      }}
    >
      <DatePicker.RangePicker
        format="DD-MM-YYYY"
        value={range}
        onChange={onChangeHandler}
      ></DatePicker.RangePicker>
      <Button
        type="primary"
        danger={true}
        onClick={() => {
          setRange([]);
          clearFilters();
          setSelectedKeys([]);
        }}
      >
        Clear
      </Button>
    </div>
  );
};

const JoiningDateColumn = {
  title: "Joining Date",
  dataIndex: "joiningDate",
  key: "joiningDate",
  render: (date) => {
    return dayjs(date).format("DD-MM-YYYY");
  },
  sorter: (a, b) => dayjs(a.joiningDate) - dayjs(b.joiningDate),
  filterDropdown: JoiningDateFilterDropdown,
  onFilter: (values, record) => {
    return (
      dayjs(record.joiningDate) >= values.startDate &&
      dayjs(record.joiningDate) <= values.endDate
    );
  },
};

export default JoiningDateColumn;
