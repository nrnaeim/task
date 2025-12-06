import { Button, Col, Input, Row } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import styles from "./Dashboard.module.css";
import DataTable from "../../components/Table/Table";
import AddEmployeeForm from "../../components/AddEmployeeForm/AddEmployeeForm";
import useFormStore from "../../store/form.store";
import useEmployeeStore from "../../store/employee.store";
import useAppStore from "../../store/app.store";

function Dashboard() {
  //App store
  const setLoading = useAppStore((s) => s.setLoading);
  //Employee store
  const employees = useEmployeeStore((s) => s.employees);
  const fetchEmployees = useEmployeeStore((s) => s.fetchEmployees);

  //Form store
  const setShowForm = useFormStore((s) => s.setShowForm);

  //Local state
  const [siderCollaps, setSiderCollaps] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [tableData, setTableData] = useState([]);
  const timeOutIdRef = useRef(null);

  const onChangeHandler = (e) => {
    if (timeOutIdRef.current) clearTimeout(timeOutIdRef.current);
    setLoading(true);
    timeOutIdRef.current = setTimeout(() => {
      setSearchText(e.target.value);
    }, 500);

    return () => clearTimeout(timeOutIdRef.current);
  };

  useEffect(() => {
    const uniqueSet = new Set();
    if (searchText && searchText !== "") {
      const searchTextArray = searchText.replace(/ +/g, " ").trim().split(" ");
      const filterData = employees.filter((item) => {
        if (!uniqueSet.has(item._id)) {
          uniqueSet.add(item._id);
          const keys = Object.keys(item);
          for (let text of searchTextArray) {
            const regExp = new RegExp(text, "ig");
            for (let key of keys) {
              if (regExp.test(item[key])) return item;
            }
          }
        }
      });
      setTableData(filterData);
    } else {
      setTableData(employees);
    }
    setLoading(false);
  }, [searchText]);

  //Fetching employees
  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchEmployees();
      setLoading(false);
    })();
  }, [fetchEmployees]);
  //Updating table data after employees changes
  useEffect(() => {
    setTableData(employees);
  }, [employees]);

  return (
    <>
      <Row className={styles.mainRow}>
        <Col span={siderCollaps ? 2 : 4} className={styles.siderContainer}>
          <div className={styles.header}>
            <h2>{siderCollaps ? "" : "Dashboard"}</h2>
            <Button
              type="text"
              className={styles.siderCollapsBtn}
              onClick={() => {
                setSiderCollaps(!siderCollaps);
              }}
            >
              {!siderCollaps && <MenuFoldOutlined />}
              {siderCollaps && <MenuUnfoldOutlined />}
            </Button>
          </div>
        </Col>
        <Col span={siderCollaps ? 22 : 20} className={styles.content}>
          <div className={styles.btnContainer}>
            {/*Global search input*/}
            <Input
              id="searchText"
              name="searchText"
              style={{ width: "400px" }}
              placeholder="Search here"
              onChange={onChangeHandler}
            />

            {/*add employee button*/}
            <Button onClick={() => setShowForm(true)}>
              <PlusOutlined /> Add
            </Button>
          </div>
          <div className={styles.tableContainer}>
            <DataTable tableData={tableData} />
          </div>
          <AddEmployeeForm />
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
