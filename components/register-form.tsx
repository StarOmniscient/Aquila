"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<string[]>([])
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; username?: string }>({})
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const validatePassword = (value: string) => {
        const newErrors = []
        if (value.length < 12) newErrors.push("At least 12 characters")
        if (!/[A-Z]/.test(value)) newErrors.push("At least 1 uppercase letter")
        if (!/[0-9]/.test(value)) newErrors.push("At least 1 number")
        if (!/[!@#$%^&*]/.test(value)) newErrors.push("At least 1 special character")
        setErrors(newErrors)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")
        setFieldErrors({})

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, username }),
            })

            const data = await res.json()

            if (!res.ok) {
                // handle unique constraint errors
                if (data.error?.includes("email")) setFieldErrors((prev) => ({ ...prev, email: "Email already in use" }))
                if (data.error?.includes("userName")) setFieldErrors((prev) => ({ ...prev, username: "Username already in use" }))
                throw new Error("Please fix the errors below")
            }

            setMessage("✅ Account created! You can now sign in.")
            setEmail("")
            setPassword("")
            setUsername("")
            setErrors([])
        } catch (err: any) {
            setMessage(`❌ ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Create account</CardTitle>
                    <CardDescription>
                        Enter your email, username, and password to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Username */}
                        <div className="grid gap-3">
                            <Label htmlFor="userName">Username</Label>
                            <Input
                                id="userName"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Your username"
                                required
                                disabled={loading}
                            />
                            {fieldErrors.username && <p className="text-sm text-red-500">{fieldErrors.username}</p>}
                        </div>

                        {/* Email */}
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="m@example.com"
                                required
                                disabled={loading}
                            />
                            {fieldErrors.email && <p className="text-sm text-red-500">{fieldErrors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <button
                                type="button"
                                className="ml-auto text-sm underline hover:opacity-80"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    validatePassword(e.target.value)
                                }}
                                required
                                disabled={loading}
                            />
                            {errors.length > 0 && (
                                <ul className="text-sm text-red-500 list-disc pl-5">
                                    {errors.map((err, i) => (
                                        <li key={i}>{err}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="flex flex-col gap-3">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={errors.length > 0 || loading}
                            >
                                {loading ? "Registering..." : "Register"}
                            </Button>
                        </div>

                        {/* Feedback */}
                        {message && <p className="mt-3 text-center text-sm">{message}</p>}

                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a href="/auth/login" className="underline underline-offset-4">
                                Sign in
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
