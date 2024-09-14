import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Calendar } from "lucide-react";
import { validateRequest } from "@/lib/auth/VerifyUserisAuthenticatedOrNot";
import { redirect } from "next/navigation";
import { getUserById } from "@/data-access/user.persistance";

const ProfilePage = async () => {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth/login");
  }
  const currentUser = await getUserById(user.id);

  return (
    <div className="flex items-center justify-center  w-[100%] md:w-[50%] min-h-[40%]">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center border-b border-gray-700 pb-6">
          <CardTitle className="text-3xl font-bold text-blue-400">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-6">
            <Avatar className="w-32 h-32 border-4 border-blue-500 shadow-lg">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${currentUser.username}&backgroundColor=00008B`}
                alt={currentUser.username}
              />
              <AvatarFallback className="bg-blue-600 text-xl">
                {currentUser.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-4 w-full">
              <ProfileField
                icon={<User className="text-blue-400" />}
                label="Username"
                value={currentUser.username}
              />
              <ProfileField
                icon={<Mail className="text-blue-400" />}
                label="Email"
                value={currentUser.email}
              />
              <ProfileField
                icon={<Calendar className="text-blue-400" />}
                label="Joined"
                value={new Date(currentUser?.createdAt).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProfileField = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-600">
    {icon}
    <div className="flex flex-col">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  </div>
);

export default ProfilePage;
