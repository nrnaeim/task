import styles from "./AddEmployeeForm.module.css";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { departments, roles } from "./Fields";
import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import useEmployeeStore from "../../store/employee.store";
import useFormStore from "../../store/form.store";

const AddEmployeeForm = () => {
  //Form states
  const showForm = useFormStore((s) => s.showForm);
  const setShowForm = useFormStore((s) => s.setShowForm);
  const personToUpdate = useFormStore((s) => s.personToUpdate);
  const setPersonToUpdate = useFormStore((s) => s.setPersonToUpdate);
  //Employee states
  const setFetchError = useEmployeeStore((s) => s.setFetchError);
  const addEmployee = useEmployeeStore((s) => s.addEmployee);
  const updateEmployee = useEmployeeStore((s) => s.updateEmployee);

  const [form] = useForm();

  useEffect(() => {
    if (personToUpdate) {
      return form.setFieldsValue({
        name: personToUpdate.name,
        department: personToUpdate.department,
        joiningDate: dayjs(personToUpdate.joiningDate),
        role: personToUpdate.role,
        gender: personToUpdate.gender,
        status: personToUpdate.status,
      });
    }
    return form.resetFields();
  }, [personToUpdate]);

  const onFinish = async (values) => {
    if (personToUpdate) {
      const id = personToUpdate._id;
      await updateEmployee(id, values);
    } else {
      await addEmployee(values);
    }
    if (!useEmployeeStore.getState().fetchError) {
      form.resetFields();
      setShowForm(false);
      setFetchError(false);
      setPersonToUpdate(null);
    }
  };

  return (
    <div
      className={styles.formContainer}
      style={showForm ? { right: "0px" } : { right: "-600px" }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 0 }}>
        {personToUpdate ? "Update employee" : "Add employee"}
      </h1>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className={styles.form}
      >
        {/*Name*/}
        <Form.Item
          name="name"
          label="Employee name"
          hasFeedback
          rules={[
            { required: true, message: "Name is required" },
            { whitespace: false, message: "Name can't be empty" },
            { min: 1, message: "Name can't be empty" },
            {
              max: 50,
              message: "Maximun name length 50 characters",
            },
          ]}
        >
          <Input placeholder="Enter employee name" allowClear />
        </Form.Item>

        {/*Department */}
        <Form.Item
          name="department"
          label="Department"
          hasFeedback
          rules={[
            { required: true, message: "Department is required" },
            { enum: departments, message: "Please selece from below" },
          ]}
        >
          <Select placeholder="Select department" allowClear showSearch>
            {departments.map((dep, index) => {
              return (
                <Select.Option key={index} value={dep}>
                  {dep}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        {/*Joining Date */}
        <Form.Item
          name="joiningDate"
          label="Joining date"
          hasFeedback
          rules={[
            { required: true, message: "Joining date is required" },
            {
              validator: (_, value) => {
                if (value && value.valueOf() > Date.now()) {
                  return Promise.reject(
                    "Joining date can not be in the future"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker
            picker="date"
            style={{ width: "100%" }}
            allowClear
            format="DD-MM-YYYY"
            placement="topLeft"
          />
        </Form.Item>

        {/*Role */}
        <Form.Item
          name="role"
          label="Role"
          hasFeedback
          rules={[{ required: true, message: "Role is required" }]}
        >
          <Select placeholder="Select role" allowClear showSearch>
            {roles.map((role, index) => {
              return (
                <Select.Option key={index} value={role}>
                  {role}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        {/*Gender */}
        <Form.Item
          name="gender"
          label="Gender"
          hasFeedback
          rules={[{ required: true, message: "Role is required" }]}
        >
          <Select placeholder="Select Gender" allowClear>
            <Select.Option key="male" value="Male">
              Male
            </Select.Option>
            <Select.Option key="female" value="Female">
              Female
            </Select.Option>
          </Select>
        </Form.Item>

        {/*Status */}
        <Form.Item
          name="status"
          label="Status"
          hasFeedback
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select placeholder="Select status" allowClear>
            <Select.Option key="active" value="Active">
              Active
            </Select.Option>
            <Select.Option key="archive" value="Archive">
              Archive
            </Select.Option>
          </Select>
        </Form.Item>

        {/*Buttons */}
        <Form.Item>
          <div className={styles.formControllBtns}>
            <Button
              type="primary"
              onClick={() => {
                setShowForm(false);
                setPersonToUpdate(null);
              }}
            >
              Close
            </Button>

            <Button type="primary" htmlType="submit">
              {personToUpdate ? "Update" : "Add"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEmployeeForm;
