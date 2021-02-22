import Layout from "../components/Layout.jsx";
import Signupcomponent from "../components/auth/SignupComponent";

const Signup = () => {
  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Signup</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Signupcomponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
