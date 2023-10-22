import MainNavigation from "../navigation/MainNavigation";

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    //@TODO create background animation
    <div className="bg-bg_black text-white min-h-screen">
      <div className="grid md:grid-cols-[8.125rem,1fr] md:h-screen">
        <MainNavigation />
        <div className="w-full px-6">{children}</div>
      </div>
    </div>
  );
}

export default BaseLayout;
