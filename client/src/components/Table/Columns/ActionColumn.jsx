import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AppContext } from "../../../Contexts/Contexts";
import { Popconfirm } from "antd";
import employeeApis from "../../../apis/apis";
import { toast } from "react-toastify";

const ActionRenderColumn = ({ record }) => {
  const { setShowAddForm, setPersonToUpdate, setData, setTableData } =
    useContext(AppContext);
  const deleteButtonHandler = async () => {
    try {
      const id = record._id;
      let response = await employeeApis.delete(`/delete/${id}`);
      if (response.data?.success) {
        toast.success(response.data?.message);
        response = await employeeApis.get("/");
        setData(response.data.data);
        setTableData(response.data.data);
      }
    } catch (error) {
      return toast.error(error.response.data?.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <EditOutlined
        onClick={() => {
          setShowAddForm(true);
          setPersonToUpdate(record);
        }}
      />
      <Popconfirm
        title="Are you sure?"
        okText="Yes"
        onConfirm={deleteButtonHandler}
        cancelText="No"
      >
        <DeleteOutlined style={{ color: "red" }} />
      </Popconfirm>
    </div>
  );
};

const ActionColumn = {
  title: "Action",
  dataIndex: "action",
  key: "action",
  width: 120,
  align: "center",
  render: (value, record) => <ActionRenderColumn record={record} />,
};

export default ActionColumn;
