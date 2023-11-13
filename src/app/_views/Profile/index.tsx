import EditUserForm from "@/app/_components/forms/EditUserForm";
import { UserEdit } from "@/app/_models/user";
import { User } from "next-auth";

interface Profileprops {
  profile: UserEdit;
  sessionUser: User;
}

function ProfileView(props: Profileprops) {
  return (
    <div>
      profile
      <EditUserForm profile={props.profile} sessionUser={props.sessionUser} />
    </div>
  );
}
export default ProfileView;
