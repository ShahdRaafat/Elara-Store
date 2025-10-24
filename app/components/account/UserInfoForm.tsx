import { updateUserInfo } from "@/app/_lib/actions";
import { Building2, MapPin, Phone, User } from "lucide-react";
import SectionHeader from "../SectionHeader";
import SubmitButton from "./SubmitButton";
import UserFormInput from "./UserFormInput";

interface UserInfoProps {
  user: {
    id: string;
    full_name: string;
    phone: string;
    address: string;
    city: string;
    role: string;
    email?: string;
  };
}

export default function UserInfoForm({ user }: UserInfoProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
      <SectionHeader
        icon={User}
        title="Personal Information"
        description="Update your account details and personal information"
      />

      <form action={updateUserInfo} className="p-8">
        <div className="space-y-6">
          <UserFormInput
            id="full_name"
            name="full_name"
            label="Full Name"
            icon={User}
            placeholder="Enter your full name"
            defaultValue={user.full_name}
            required
          />

          {user.email && (
            <UserFormInput
              id="email"
              name="email"
              label="Email Address"
              type="email"
              icon={User}
              placeholder="Email"
              defaultValue={user.email}
              disabled
            />
          )}

          <UserFormInput
            id="phone"
            name="phone"
            label="Phone Number"
            type="tel"
            icon={Phone}
            placeholder="Enter your phone number"
            defaultValue={user.phone}
          />

          <UserFormInput
            id="address"
            name="address"
            label="Street Address"
            icon={MapPin}
            placeholder="Enter your street address"
            defaultValue={user.address}
          />

          <UserFormInput
            id="city"
            name="city"
            label="City"
            icon={Building2}
            placeholder="Enter your city"
            defaultValue={user.city}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
