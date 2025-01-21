import { Button, Checkbox, Form, Input } from "antd";
import { useLoginUserMutation } from "../../shared/redux/api/auth";
import { Link } from "react-router-dom";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Login = () => {
  const [login] = useLoginUserMutation(); 

  return (
    <div className="signIn">
      <div className="sign-in-container">
        <div className="column">
          <div className="sign-in-title">Welcome</div>
          <Form
            name="basic"
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={(values) => login(values)}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label=""
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input type="email" placeholder="Email" className="h-12" />
            </Form.Item>

            <Form.Item
              label=""
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" className="h-12" />
            </Form.Item>

            <Form.Item label={null}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Checkbox className="remember" name="remember">
                  Remember me
                </Checkbox>
                <Link
                  className="link"
                  to="/forgot-password"
                  style={{ textAlign: "right" }}
                >
                  Forgot Password?
                </Link>
              </div>
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
