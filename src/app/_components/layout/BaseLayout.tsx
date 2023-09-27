import MainNavigation from "../Navigation/MainNavigation";

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    //@TODO create background animation
    <div className="bg-bg_black text-white min-h-screen">
      <div className="flex md:flex-row">
        <MainNavigation />
        <div className="w-full md:md:w-10/12 px-6">{children}</div>
      </div>
    </div>
  );
}

export default BaseLayout;
