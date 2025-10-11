import CustomImage from "@/components/custom-image";
import { profileData } from "@/lib/placeholder_data";

export default function Profile() {
  return (
    <div className="relative h-full">
      <div className="flex h-full w-full flex-col space-y-3 rounded-2xl bg-[#F2F6FA] p-5 dark:bg-[#161515]">
        <div className="flex flex-col space-y-3">
          <p className="text-3xl font-semibold">Profile</p>
          <span className="text-xs">view all your profile details here</span>
        </div>
        <div className="w-full border-2 border-b border-dashed"></div>
        <div className="grid grid-cols-[35%_63%] gap-4">
          <div className="flex flex-col items-center justify-center space-y-6 rounded-lg border py-5">
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-xl font-semibold">Maria Fernanda</p>
              <span className="text-sm">Premium User</span>
            </div>
            <span className="h-auto w-3/4 rounded-full p-3">
              <CustomImage
                image={{
                  alt: "Avatar",
                  src: "/images/woman.jpg",
                  class: "rounded-full p-3 bg-stone-600",
                  className: "rounded-full bg-center",
                }}
              />
            </span>
          </div>
          <div className="flex flex-col space-y-3 rounded-lg border p-5">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Bio and other details</div>
              <div className="bg-green-2 00 flex size-4 items-center justify-center rounded-full">
                <span className="size-2 rounded-full bg-green-400"></span>
              </div>
            </div>
            <ul className="box-border flex w-full flex-col space-y-4">
              {profileData.map((profile, idx) => {
                return (
                  <li key={idx} className="flex w-full">
                    <div className="flex flex-1 flex-col space-y-1">
                      <span className="text-sm font-normal">
                        {profile.keys[0]}
                      </span>
                      <p className="font-medium"> {profile.values[0]}</p>
                    </div>
                    <div className="flex flex-1 flex-col space-y-1">
                      <span className="text-sm font-normal">
                        {profile.keys[1]}
                      </span>
                      <p className="font-medium"> {profile.values[1]}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
