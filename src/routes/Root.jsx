import GlobalRoutes from "./configs/_global";
import PublicRoutes from "./configs/_public";

const RootRouter = () => {
  return (
    <>
      <GlobalRoutes />
      <PublicRoutes />
    </>
  );
};

export default RootRouter;
