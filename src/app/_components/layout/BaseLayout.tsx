import MainNavigation from "../navigation/MainNavigation";

function BaseLayout(props: { children: React.ReactNode; session: boolean }) {
  return (
    //@TODO create background animation
    <div className="bg-bg_black text-white min-h-screen">
      <div
        className={`grid  md:min-h-screen ${
          props.session && "md:grid-cols-[8.125rem,1fr]"
        }`}
      >
        <MainNavigation />
        <div className="w-full px-6">{props.children}</div>
      </div>
    </div>
  );
}

export default BaseLayout;
