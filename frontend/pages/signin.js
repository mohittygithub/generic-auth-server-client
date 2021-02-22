import Layout from "../components/Layout.jsx";
import Signincomponent from "../components/auth/SigninComponent";

const Signin = () => {
  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Signin</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Signincomponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
