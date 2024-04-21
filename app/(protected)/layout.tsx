import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="h-full w-full flex flex-col pt-10 gap-y-10 items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-600 to-slate-800">
            <Navbar />
            {children}
        </div>
    );
}

export default ProtectedLayout;