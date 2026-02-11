'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react"
import { useRouter } from 'next/navigation';

import { registerApi } from "@/services/authService"

export function RegisterCard() {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleRegisterButton = async () => {
    console.log(email, password)
    setIsLoading(true)

    try {
      if (password !== confirmPassword) {
        setIsError(true)
        setStatusMessage("Passwords do not match")
        return
      }
      const response = await registerApi(name, email, password, confirmPassword)

      const data = await response.json()

      if (response.ok) {
        setStatusMessage("Registration Successful!")
        setIsError(false)
      } else {
        console.error("Login Failed:", data.message)
        setStatusMessage(data.message || "Registration Failed")
        setIsError(true)
      }
    } catch (error) {
      console.error("Error:", error)
      setStatusMessage("Registration Failed")
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const goToLogin = () => {
    router.push('/login')
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Register account</CardTitle>
      </CardHeader>
      <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          </div>
          {
            statusMessage !== "" &&
            <div className="pt-4 flex justify-center align-middle">
              <div className={`w-full py-2 text-center ${isError ? "bg-red-200 text-red-500" : "bg-green-200 text-green-500"}`}>
                {statusMessage}
              </div>
            </div>
          }
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button disabled={isLoading} onClick={handleRegisterButton} className="w-full">
          Register
        </Button>
        <a onClick={goToLogin} className="text-sm text-blue-500 hover:underline cursor-pointer">
          Already have an account? Login
        </a>
      </CardFooter>
    </Card>
  )
}
