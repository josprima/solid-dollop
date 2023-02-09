import { SideBar } from '@components/side-bar';
import MainLayoutProps from './MainLayout.interface';

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex w-full h-full">
      <SideBar />

      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

export default MainLayout;
