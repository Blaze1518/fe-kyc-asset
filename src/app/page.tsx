"use client";
import Login from "@/modules/sign-in/presentation/components/login";
import TransitionBox from "@/shared/ui/box-transition";
export default function Page() {
  return (
    <>
      <TransitionBox variant="slideRight">
        <Login />
      </TransitionBox>
    </>
  );
}
