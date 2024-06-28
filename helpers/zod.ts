// import { ErrorState } from "./../app/page";
// import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { ZodError, z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(4, "password must be at least 4 characters"),
});

export async function validate(
  data: z.infer<typeof loginSchema>
  // callback: Dispatch<SetStateAction<ErrorState | null>>
) {
  try {
    const validData = loginSchema.parse(data);
    return validData;
  } catch (error) {
    if ((error as ZodError).flatten().fieldErrors.username?.[0]) {
      toast.error(
        (error as ZodError).flatten().fieldErrors.username?.[0] ?? ""
      );
    }
    
    if ((error as ZodError).flatten().fieldErrors.password?.[0]) {
      toast.error(
        (error as ZodError).flatten().fieldErrors.password?.[0] ?? ""
      );
    }

    // callback({
    //   username:
    //     (error as ZodError).flatten().fieldErrors.username?.[0] ?? "",
    //   password:
    //     (error as ZodError).flatten().fieldErrors.password?.[0] ?? "",
    // });
  }
}
