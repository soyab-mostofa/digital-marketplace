import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();
  const signOut = async () => {
    try {
      // sign out logic
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to sign out");
      toast.success("Successfully signed out");
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
    }
  };
  return { signOut };
};
