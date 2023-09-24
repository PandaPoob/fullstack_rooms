function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    //@TODO create background animation
    <div className="bg-bg_black text-white min-h-screen px-6">{children}</div>
  );
}

export default BaseLayout;
