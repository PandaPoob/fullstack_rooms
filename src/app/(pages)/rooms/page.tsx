import { requireAuthentication } from "@/app/_middleware/authentication";
import Rooms from "@/app/_views/Rooms";

function RoomsPage() {
  return <Rooms />;
}

export default requireAuthentication(RoomsPage);
