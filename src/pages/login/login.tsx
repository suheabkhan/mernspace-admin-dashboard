import { Alert, Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd";
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "../../components/icons/Logo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserLoginData } from "../../types";
import { loginAPI, getSelfAPI } from "../../http/api";
import { useAuthStore } from "../../store";

const loginUser = async (userData: UserLoginData) => {
  // server call logic
  const { data } = await loginAPI(userData);
  return data;
};

const getSelf = async () => {
  // server call logic
  const { data } = await getSelfAPI();
  //console.log(data);
  return data;
};

const LoginPage = () => {
  // import the functions of state from useAuthStore
  const { setUser, logout } = useAuthStore();

  //For get operations use, useQuery
  const { data, refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    //This makes sure, wheenver the component is rendered, this doesnot get executed automatically
    enabled: false,
  });
  // mutate is a function , that we can use to invoke the mutationFunction
  // isPending is a boolean, which will be true untill we get the response
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      //getSelf
      const selfDataPromise = await refetch();
      setUser(selfDataPromise.data);
    },
  });

  return (
    <>
      <Layout style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Space direction="vertical" align="center" size="large">
          <Layout.Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Logo />
          </Layout.Content>
          <Card
            bordered={false}
            style={{ width: 300 }}
            title={
              <Space style={{ width: "100%", fontSize: 16, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <LockFilled />
                Sign in
              </Space>
            }
          >
            <Form
              initialValues={{
                remember: true,
              }}
              onFinish={(values) => {
                mutate({ email: values.username, password: values.password });
                console.log(values);
              }}
            >
              {isError && <Alert message={error.message} type="error" style={{ marginBottom: 25 }} />}
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please enter your username",
                  },
                  {
                    type: "email",
                    message: "Email is not valid",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
              <Flex justify="space-between">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="#" id="login-form-forgot">
                  Forgot password
                </a>
              </Flex>

              <Form.Item name="password">
                <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={isPending}>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default LoginPage;
