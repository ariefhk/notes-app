import Navbar from "@/components/common/navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="mx-auto h-screen max-w-[500px] overflow-x-hidden overflow-y-hidden flex flex-col">
      <Navbar />
      <section className="pt-3 pb-16 container flex flex-col flex-grow overflow-y-hidden"> {children}</section>
    </main>
  );
};

export default Layout;
