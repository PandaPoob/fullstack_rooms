import EditUserForm from "@/app/_components/forms/EditUserForm";
import { UserEdit } from "@/app/_models/user";
import { Status } from "@prisma/client";

interface Profileprops {
  profile: UserEdit;
  statusOptions: Status[];
}

function ProfileView(props: Profileprops) {
  return (
    <div>
      <EditUserForm
        profile={props.profile}
        statusOptions={props.statusOptions}
      />
    </div>
  );
}
export default ProfileView;
