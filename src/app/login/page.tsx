/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useRouter } from "next/navigation"; 

const isValidEmail = (e: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

type Mode = "signin" | "signup";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState<{ uid: string; email: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
 const router = useRouter(); 


  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(() => {});
    return onAuthStateChanged(auth, (u) => {
      setUser(u ? { uid: u.uid, email: u.email } : null);
      setLoading(false);
    });
  }, []);

  const resetErr = () => setErr(null);

  const signIn = async () => {
    resetErr();
    const e = email.trim().toLowerCase();
    if (!isValidEmail(e)) return setErr("Please enter a valid email.");
    try {
      await signInWithEmailAndPassword(auth, e, pass);
      router.push("/"); 
    } catch (e: any) {
      setErr(e.code ?? String(e));
    }
  };

  const signUp = async () => {
    resetErr();
    const e = email.trim().toLowerCase();
    if (!isValidEmail(e)) return setErr("Please enter a valid email.");
    if (pass.length < 6) return setErr("Password must be at least 6 characters.");
    try {
      await createUserWithEmailAndPassword(auth, e, pass);
    } catch (e: any) {
      setErr(e.code ?? String(e));
    }
  };

  const logout = async () => {
    resetErr();
    try {
      await signOut(auth);
    } catch (e: any) {
      setErr(e.code ?? String(e));
    }
  };

  const disabledSignin = !isValidEmail(email) || pass.length === 0;
  const disabledSignup = !isValidEmail(email) || pass.length < 6;

  return (
    <Shell>
      <Card>
        <Tabs role="tablist" aria-label="Auth tabs">
          <Tab
            role="tab"
            aria-selected={mode === "signin"}
            $active={mode === "signin"}
            onClick={() => setMode("signin")}
          >
            Sign In
          </Tab>
          <Tab
            role="tab"
            aria-selected={mode === "signup"}
            $active={mode === "signup"}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </Tab>
        </Tabs>

        {err && <ErrorMsg>{err}</ErrorMsg>}

        {loading ? (
          <Muted>Loading…</Muted>
        ) : user ? (
          <Section>
            <H1>Welcome 👋</H1>
            <Muted>
              Signed in as <b>{user.email}</b>
            </Muted>
            <PrimaryButton $danger onClick={logout}>
              Sign out
            </PrimaryButton>
          </Section>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mode === "signin" ? signIn() : signUp();
            }}
          >
            <Section>
              <H1>{mode === "signin" ? "Sign in to your account" : "Create your account"}</H1>

              <Field>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={resetErr}
                  autoComplete="email"
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder={mode === "signup" ? "Minimum 6 characters" : "Your password"}
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  onFocus={resetErr}
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  required
                />
              </Field>

              <PrimaryButton
                type="submit"
                disabled={mode === "signin" ? disabledSignin : disabledSignup}
              >
                {mode === "signin" ? "Sign In" : "Sign Up"}
              </PrimaryButton>

              <SwitchRow>
                {mode === "signin" ? (
                  <>
                    Don’t have an account?{" "}
                    <SwitchBtn type="button" onClick={() => setMode("signup")}>
                      Create one
                    </SwitchBtn>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <SwitchBtn type="button" onClick={() => setMode("signin")}>
                      Sign in
                    </SwitchBtn>
                  </>
                )}
              </SwitchRow>
            </Section>
          </form>
        )}
      </Card>
    </Shell>
  );
}

/* ========================= styled ========================= */

const Shell = styled.main`
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    radial-gradient(1000px 600px at 10% -10%, rgba(124, 58, 237, 0.12), transparent 60%),
    radial-gradient(800px 500px at 110% 110%, rgba(219, 39, 119, 0.12), transparent 60%),
    ${({ theme }) => theme.colors?.background ?? "#0b1220"};
`;

const Card = styled.section`
  width: 100%;
  max-width: 420px;
  background: ${({ theme }) => theme.colors?.card ?? "#0f172a"};
  border: 1px solid ${({ theme }) => theme.colors?.ring ?? "rgba(148,163,184,.2)"};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  background: ${({ theme }) => theme.colors?.muted ?? "rgba(148,163,184,.08)"};
  border: 1px solid ${({ theme }) => theme.colors?.ring ?? "rgba(148,163,184,.2)"};
  border-radius: 999px;
  padding: 6px;
`;

const Tab = styled.button<{ $active?: boolean }>`
  border-radius: 999px;
  padding: 10px 0;
  font-weight: 800;
  color: ${({ theme }) => theme.colors?.text ?? "#e5e7eb"};
  background: transparent;
  cursor: pointer;
  border: none;
  ${({ $active, theme }) =>
    $active &&
    css`
      background: ${theme.colors?.cardElevated ?? "#0b1220"};
      border: 1px solid ${theme.colors?.ring ?? "rgba(148,163,184,.2)"};
      box-shadow: 0 6px 22px rgba(99, 102, 241, 0.25);
      color: ${theme.colors?.primaryText ?? "#fff"};
    `}
  transition: all .18s ease;
`;

const Section = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 16px;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors?.text ?? "#e5e7eb"};
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
`;

const Label = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors?.subtext ?? "#94a3b8"};
`;

const Input = styled.input`
  background: ${({ theme }) => theme.colors?.input ?? "#0b1220"};
  color: ${({ theme }) => theme.colors?.text ?? "#e5e7eb"};
  border: 1px solid ${({ theme }) => theme.colors?.ring ?? "rgba(148,163,184,.2)"};
  border-radius: 12px;
  padding: 12px 14px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors?.primary ?? "#7c3aed"};
    box-shadow: 0 0 0 3px
      ${({ theme }) => theme.colors?.primaryFocus ?? "rgba(124,58,237,.35)"};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors?.mutedText ?? "#94a3b888"};
  }
`;

const PrimaryButton = styled.button<{ $danger?: boolean }>`
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 12px 14px;
  font-weight: 800;
  color: #fff;
  cursor: pointer;
  background: ${({ $danger, theme }) =>
    $danger
      ? theme.colors?.danger ?? "#ef4444"
      : `linear-gradient(90deg, ${theme.colors?.primary ?? "#7c3aed"}, ${
          theme.colors?.accent ?? "#db2777"
        })`};
  box-shadow: 0 10px 24px rgba(124, 58, 237, 0.35);
  transition: transform 0.08s ease, filter 0.12s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.02);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
    background: ${({ theme }) => theme.colors?.disabled ?? "#374151"};
  }
`;

const SwitchRow = styled.p`
  margin: 4px 0 0;
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors?.subtext ?? "#94a3b8"};
`;

const SwitchBtn = styled.button`
  color: ${({ theme }) => theme.colors?.primary ?? "#7c3aed"};
  font-weight: 700;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0 2px;
  text-decoration: underline;
`;

const Muted = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors?.subtext ?? "#94a3b8"};
  text-align: center;
`;

const ErrorMsg = styled.div`
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  color: #fecaca;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.35);
`;
