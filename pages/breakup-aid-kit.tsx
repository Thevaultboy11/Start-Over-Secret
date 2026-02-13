import { useEffect } from "react";
import { useRouter } from "next/router";

export default function BreakupAidKitRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/booking-call");
  }, [router]);

  return null;
}
