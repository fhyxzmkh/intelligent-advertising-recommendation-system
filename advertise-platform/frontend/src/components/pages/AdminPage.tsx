import { Button, Result } from "antd";

export const AdminPage = ({ currentUser }) => {
  if (currentUser === null || currentUser.role !== "ADMIN") {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" href="/advertise-platform/login">
            Back to login
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div>{currentUser.username}</div>
    </>
  );
};
