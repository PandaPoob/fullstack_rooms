import EditUserForm from "@/app/_components/forms/EditUserForm";
import { UserEdit } from "@/app/_models/user";
import { User } from "next-auth";

interface Profileprops {
  profile: UserEdit;
}

function ProfileView(props: Profileprops) {
  return (
    <div>
      <EditUserForm profile={props.profile} />
    </div>
  );
}
export default ProfileView;
