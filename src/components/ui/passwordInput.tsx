import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  field: any;
  label?: string;
  description?: string;
}

const PasswordInput: React.FC<PasswordFieldProps> = ({
  field,
  label = "Password",
  description = "Enter your account password.",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            {...field}
            type={showPassword ? "text" : "password"}
            placeholder="******"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-2"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default PasswordInput;
