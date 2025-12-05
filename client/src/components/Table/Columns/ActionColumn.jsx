import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import useEmployeeStore from "../../../store/employee.store";
import useFormStore from "../../../store/form.store";

const ActionRenderColumn = ({ record }) => {
  //Form store
  const setShowForm = useFormStore((s) => s.setShowForm);
  const setPersonToUpdate = useFormStore((s) => s.setPersonToUpdate);
  //Employee store
  const deleteEmployee = useEmployeeStore((s) => s.deleteEmployee);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
      }}
    >
      {/*Edit icon*/}
      <EditOutlined
        onClick={() => {
          setShowForm(true);
          setPersonToUpdate(record);
        }}
      />
      {/*Delete icon */}
      <Popconfirm
        title="Are you sure?"
        okText="Yes"
        onConfirm={() => deleteEmployee(record)}
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
