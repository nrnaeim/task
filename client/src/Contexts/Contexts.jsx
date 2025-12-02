import { createContext, useEffect, useState } from "react";
import employeeApis from "../apis/apis";
import days from "dayjs";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  /*Sider collaps button state*/
  const [siderCollaps, setSiderCollaps] = useState(false);
  /*Employee adding form state, hidden or visible*/
  const [showAddForm, setShowAddForm] = useState(false);
  /*Person state to track which person need to update*/
  const [personToUpdate, setPersonToUpdate] = useState(null);
  /*Spin state*/
  const [loading, setLoading] = useState(true);
  /*All data state*/
  const [data, setData] = useState([]);
  /*Table data state*/
  const [tableData, setTableData] = useState([]);
  /*Table data state*/
  const [searchText, setSearchText] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await employeeApis.get("/");
        const employees = await response.data?.data;
        setData(employees);
        setTableData(employees);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const contexts = {
    siderCollaps,
    setSiderCollaps,
    showAddForm,
    setShowAddForm,
    personToUpdate,
    setPersonToUpdate,
    loading,
    setLoading,
    data,
    setData,
    tableData,
    setTableData,
    searchText,
    setSearchText,
  };

  return <AppContext.Provider value={contexts}>{children}</AppContext.Provider>;
};
