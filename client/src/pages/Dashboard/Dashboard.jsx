import { Button, Col, Input, Row } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Dashboard.module.css";
import DataTable from "../../components/Table/Table";
import AddEmployeeForm from "../../components/AddEmployeeForm/AddEmployeeForm";
import { AppContext } from "../../Contexts/Contexts";

function Dashboard() {
  const {
    siderCollaps,
    setSiderCollaps,
    setShowAddForm,
    data,
    setTableData,
    searchText,
    setSearchText,
  } = useContext(AppContext);

  const timeOutIdRef = useRef(null);
  const onChangeHandler = (e) => {
    if (timeOutIdRef.current) clearTimeout(timeOutIdRef.current);
    timeOutIdRef.current = setTimeout(() => {
      setSearchText(e.target.value);
    }, 500);
  };
  useEffect(() => {
    const uniqueSet = new Set();
    if (searchText && searchText !== "") {
      const searchTextArray = searchText.replace(/ +/g, " ").trim().split(" ");
      const filterData = data.filter((item) => {
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
      return setTableData(filterData);
    }
    return setTableData(data);
  }, [searchText]);

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
              style={{ width: "400px" }}
              placeholder="Search here"
              onChange={onChangeHandler}
            />

            {/*add employee button*/}
            <Button onClick={() => setShowAddForm(true)}>
              <PlusOutlined /> Add
            </Button>
          </div>
          <div className={styles.tableContainer}>
            <DataTable />
          </div>
          <AddEmployeeForm />
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
