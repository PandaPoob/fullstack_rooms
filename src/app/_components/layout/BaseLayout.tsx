import MainNavigation from "../navigation/MainNavigation";

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    //@TODO create background animation
    <div className="bg-bg_black text-white min-h-screen">
      <div className="flex">
        <MainNavigation />

        <div className="px-6">{children}</div>
      </div>
    </div>
  );
}

export default BaseLayout;
