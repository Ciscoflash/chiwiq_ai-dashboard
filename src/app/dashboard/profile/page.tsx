"use client";

import { useState, type FormEvent } from "react";
import {
  UserRound,
  Mail,
  Lock,
  ShieldCheck,
  Save,
  KeyRound,
} from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/providers/ToastProvider";
import { Button, Card, Input } from "@/components/ui";
import { Eyebrow } from "@/components/brand";
import { formatDateTime, getInitials } from "@/lib/utils";
import type { Admin } from "@/lib/types";

export default function ProfilePage() {
  const { admin, refreshProfile } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState(admin?.name ?? "");
  const [avatar, setAvatar] = useState(admin?.avatar ?? "");
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [pwdError, setPwdError] = useState("");

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await api<Admin>("/admin/profile", {
        method: "PUT",
        body: JSON.stringify({ name: name.trim(), avatar: avatar.trim() }),
      });
      await refreshProfile();
      toast("Profile updated");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to update profile", "error");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPwdError("");

    if (newPassword.length < 6) {
      setPwdError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdError("Passwords do not match.");
      return;
    }

    setSavingPassword(true);
    try {
      await api("/admin/change-password", {
        method: "PUT",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast("Password changed successfully");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to change password";
      setPwdError(message);
      toast(message, "error");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <Eyebrow className="mb-3">
          <span className="size-1.5 rounded-full bg-accent" />
          Account
        </Eyebrow>
        <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white">
          Profile
        </h1>
        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-white/40">
          Manage your account, profile details and security.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6">
          <Card className="p-6 text-center">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full border border-white/15 bg-white/5 font-mono text-2xl text-white">
              {admin ? getInitials(admin.name) : "A"}
            </div>
            <h2 className="mt-4 font-display text-lg font-semibold tracking-[-0.02em] text-white">
              {admin?.name}
            </h2>
            <p className="text-sm text-white/40">{admin?.email}</p>
            <span className="mt-3 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/60">
              <ShieldCheck className="size-3.5 text-accent" />
              {admin?.role}
            </span>
          </Card>

          <Card className="divide-y divide-white/5 p-2">
            <div className="flex items-center gap-3 p-3 text-sm">
              <Mail className="size-4 text-white/30" />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
                Email
              </span>
              <span className="ml-auto truncate text-white/70">{admin?.email}</span>
            </div>
            <div className="flex items-center gap-3 p-3 text-sm">
              <UserRound className="size-4 text-white/30" />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
                Role
              </span>
              <span className="ml-auto capitalize text-white/70">{admin?.role}</span>
            </div>
            <div className="flex items-center gap-3 p-3 text-sm">
              <KeyRound className="size-4 text-white/30" />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
                Since
              </span>
              <span className="ml-auto text-white/70">
                {formatDateTime(new Date().toISOString())}
              </span>
            </div>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <Eyebrow className="mb-5">
              <span className="size-1.5 rounded-full bg-lime-accent" />
              Profile information
            </Eyebrow>
            <form onSubmit={handleProfileSubmit} className="space-y-5">
              <Input
                label="Full name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                icon={<UserRound className="size-4" />}
              />
              <Input
                label="Avatar URL"
                name="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://..."
                icon={<UserRound className="size-4" />}
              />
              <div className="flex justify-end">
                <Button type="submit" loading={savingProfile}>
                  <Save className="size-4" />
                  Save changes
                </Button>
              </div>
            </form>
          </Card>

          <Card className="p-6">
            <Eyebrow className="mb-2">
              <span className="size-1.5 rounded-full bg-accent" />
              Change password
            </Eyebrow>
            <p className="mb-5 text-sm text-white/35">
              Use a strong password you don&apos;t use elsewhere.
            </p>
            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              <Input
                label="Current password"
                name="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                icon={<Lock className="size-4" />}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="New password"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  icon={<Lock className="size-4" />}
                />
                <Input
                  label="Confirm new password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  icon={<Lock className="size-4" />}
                />
              </div>
              {pwdError && (
                <p
                  role="alert"
                  className="rounded-md border border-red-400/25 bg-red-400/10 px-3.5 py-2.5 text-sm text-red-400"
                >
                  {pwdError}
                </p>
              )}
              <div className="flex justify-end">
                <Button type="submit" variant="secondary" loading={savingPassword}>
                  Update password
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
      <p className="pb-16 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white/25 md:pb-0">
        Changes are saved securely to your account.
      </p>
    </div>
  );
}